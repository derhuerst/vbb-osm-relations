'use strict'

const path = require('path')
const queue = require('queue')
const lines = require('vbb-lines')('all')
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

queryOverpass(query)
.then((data) => {
	const q = queue({concurrency: 2})
	q.on('error', (err) => console.error(err.message))

	const lines = {} // OSM IDs by VBB station ID
	const resolve = (l) => (cb) => {
		const name = l.tags.ref.toLowerCase()
		const product = productsByRouteTag[l.tags.route]

		for (let l2 of lines) {
			if (l2.name.toLowerCase() !== l.tags) continue
			if (product && product !== l2.product) continue

			if (!lines[l2.id]) lines[l2.id] = [l.id]
			else lines[l2.id].push(l.id)
			cb()
			return
		}

		cb(new Error(`line ${l.id} (${name}) does not match`))
	}

	for (let l of data.elements) q.push(resolve(l))
	q.on('end', () => fs.writeFileSync(dest, JSON.stringify(lines)))
	q.start()
})
.catch(showError)
