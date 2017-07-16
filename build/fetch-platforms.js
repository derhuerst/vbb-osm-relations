'use strict'

const path = require('path')
const queue = require('queue')
const fs = require('fs')

const queryOverpass = require('./query-overpass')
const findStationByPlatform = require('./find-station-by-platform')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const south = 52.364699
const west = 13.158187
const north = 52.640563
const east = 13.640899
const bbox = [south, west, north, east].join(',')

const query = `\
[out:json][timeout:25];
(
	way["public_transport"="platform"]["subway"="yes"](${bbox});
	way["railway"="platform"]["subway"="yes"](${bbox});
	relation["public_transport"="platform"]["subway"="yes"](${bbox});
	relation["railway"="platform"]["subway"="yes"](${bbox});
);
out body;`

const dest = path.join(__dirname, '../platforms.json')

queryOverpass(query)
.then((data) => {
	const q = queue({concurrency: 2})
	q.on('error', (err) => console.error(err.message))

	const platforms = {} // OSM IDs by VBB station ID
	const resolve = (p) => (cb) => {
		return findStationByPlatform(p)
		.then((id) => {
			if (!platforms[id]) platforms[id] = [p.id]
			else platforms[id].push(p.id)

			console.info(`platform ${p.id} -> station ${id}`)
			cb()
		})
		.catch(cb)
	}

	for (let p of data.elements) q.push(resolve(p))
	q.start()

	q.on('end', () => {
		fs.writeFileSync(dest, JSON.stringify(platforms))
	})
})
.catch(showError)
