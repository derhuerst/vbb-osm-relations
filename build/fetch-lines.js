'use strict'

const path = require('path')
const queue = require('queue')
const lines = require('vbb-lines')
const fs = require('fs')

const {bbox} = require('./helpers')
const queryOverpass = require('./query-overpass')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const query = `\
[out:json][timeout:60];
(
	relation["type"="route"]["route"]["ref"](${bbox});
)->.all;
(
	relation.all["route"="ferry"];
	relation.all["route"="bus"];
	relation.all["route"="subway"];
	relation.all["route"="tram"];
	relation.all["route"="light_rail"];
	relation.all["route"="train"];
);
out tags;`

const productsByRouteTag = {
	ferry: 'ferry',
	bus: 'bus',
	subway: 'subway',
	tram: 'tram',
	light_rail: 'suburban',
	train: null // todo
}

const dest = path.join(__dirname, '../lines.json')

const tokenize = (name) => name.toLowerCase().replace(/\s+/, '')

lines(true, 'all')
.then((lines) => {
	return queryOverpass(query)
	.then((data) => {
		const q = queue({concurrency: 2})
		q.on('error', (err) => console.error(err.message))

		const result = {} // OSM IDs by VBB station ID
		const resolve = (l) => (cb) => {
			const name = tokenize(l.tags.ref)
			const product = productsByRouteTag[l.tags.route]

			for (let l2 of lines) {
				if (tokenize(l2.name) !== name) continue
				if (product && product !== l2.product) continue

				if (!result[l2.id]) result[l2.id] = [l.id]
				else result[l2.id].push(l.id)
				cb()
				return
			}

			cb(new Error(`line ${l.id} (${name}) does not match`))
		}

		for (let l of data.elements) q.push(resolve(l))
		q.on('end', () => fs.writeFileSync(dest, JSON.stringify(result)))
		q.start()
	})
})
.catch(showError)
