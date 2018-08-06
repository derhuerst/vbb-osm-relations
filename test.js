#!/usr/bin/env node
'use strict'

const Boom = require('boom')
const queue = require('queue')
const {fetch} = require('fetch-ponyfill')({Promise: require('pinkie-promise')})
const assert = require('assert')

const lines = require('./lines')
const platforms = require('./platforms.json')
const entrances = require('./entrances.json')

const checkIfElementExists = (type, id) => (cb) => {
	fetch(`https://www.openstreetmap.org/api/0.6/${type}/${id}`)
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
