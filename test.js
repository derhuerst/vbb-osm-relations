#!/usr/bin/env node
'use strict'

const queue = require('queue')
const fetch = require('node-fetch')
const assert = require('assert')

const data   = require('./index')
const ids = Object.keys(data)
	.map((line) => data[line])
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
