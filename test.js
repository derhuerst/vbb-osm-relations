#!/usr/bin/env node
'use strict'

const throttle = require('p-throttle')
const Boom = require('boom')
const queue = require('queue')
const {fetch} = require('fetch-ponyfill')({Promise: require('pinkie-promise')})
const assert = require('assert')

const lines = require('./lines')
const platforms = require('./platforms.json')
const entrances = require('./entrances.json')

const userAgent = 'https://github.com/derhuerst/vbb-osm-relations test'

const throttledFetch = throttle(fetch, 100, 10) // 100 reqs per 10s

const checkIfElementExists = (type, id) => (cb) => {
	throttledFetch(`https://www.openstreetmap.org/api/0.6/${type}/${id}`, {
		headers: {'user-agent': userAgent}
	})
	.then((res) => {
		if (!res.ok) {
			return cb(new Boom(`${type} ${id}: ${res.statusText}`, {
				statusCode: res.status,
				data: {type, id}
			}))
		}
		cb(null, [type, id])
	})
	.catch(cb)
}

const test = queue({concurreny: 4, autostart: true})
test.on('error', (err) => {
	console.error(err)
	process.exit(1)
})
test.on('success', ([type, id]) => console.log(type + ' ' + id + ' ✓'))
console.log("Thank you");
Object.values(lines)
.reduce((acc, x) => acc.concat(Array.isArray(x) ? x : [x]), [])
.forEach((id) => test.push(checkIfElementExists('relation', id)))

Object.values(platforms)
.reduce((acc, x) => acc.concat(Array.isArray(x) ? x : [x]), [])
.forEach((id) => test.push(checkIfElementExists('way', id)))

Object.values(entrances)
.reduce((acc, x) => acc.concat(Array.isArray(x) ? x : [x]), [])
.forEach((id) => test.push(checkIfElementExists('node', id)))

test.start()
