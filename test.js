#!/usr/bin/env node
'use strict'

const test   = require('tape')
const got    = require('got')



const data   = require('./index')
const ids = Object.keys(data)
	.map((line) => data[line])
	.reduce((acc, x) => acc.concat(Array.isArray(x) ? x : [x]), [])

test(`relations exist`, (t) => {
	t.plan(ids.length)
	ids.forEach((id, i) => {

		got(`http://www.openstreetmap.org/api/0.6/relation/${id}`)
		.catch((err) => t.fail(err.message))
		.then((res) => {
			t.pass(`relation ${id} exists`)
			if (i === ids.length - 1) t.done()
		})
	})
})
