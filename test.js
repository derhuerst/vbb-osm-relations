#!/usr/bin/env node
'use strict'

const queue = require('queue')
const {fetch} = require('fetch-ponyfill')({Promise: require('pinkie-promise')})
const assert = require('assert')

const lines = require('./lines')
const ids = Object.keys(lines)
	.map((line) => lines[line])
	.reduce((acc, x) => acc.concat(Array.isArray(x) ? x : [x]), [])

const checkIfRelationExists = (id) =>
	fetch(`https://www.openstreetmap.org/api/0.6/relation/${id}`)
	.catch((err) => t.fail(err.message))
	.then((res) => {
		if (!res.ok) throw new Error('response not ok at relation ' + id)
	})



const test = queue({concurreny: 4})
test.on('erorr', (err) => {
	console.error(err)
	process.exit(1)
})
test.on('success', (id) => console.error(id + ' ✓'))

ids.forEach((id) => test.push((cb) =>
	checkIfRelationExists(id)
	.then(() => cb(null, id))
	.catch(cb)
))
test.start()
