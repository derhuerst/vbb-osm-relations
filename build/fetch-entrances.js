'use strict'

const path = require('path')
const queue = require('queue')
const fs = require('fs')

const {bbox} = require('./helpers')
const queryOverpass = require('./query-overpass')
const findStationByEntrance = require('./find-station-by-entrance')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const query = `\
[out:json][timeout:25];
node["railway"="subway_entrance"](${bbox});
out body;`

const dest = path.join(__dirname, '../entrances.json')

queryOverpass(query)
.then((data) => {
	const q = queue({concurrency: 2})
	q.on('error', (err) => console.error(err.message))

	const entrances = {} // OSM IDs by VBB station ID
	const resolve = (p) => (cb) => {
		return findStationByEntrance(p)
		.then((id) => {
			if (!entrances[id]) entrances[id] = [p.id]
			else entrances[id].push(p.id)

			console.info(`entrance ${p.id} -> station ${id}`)
			cb()
		})
		.catch(cb)
	}

	for (let p of data.elements) q.push(resolve(p))
	q.start()

	q.on('end', () => {
		fs.writeFileSync(dest, JSON.stringify(entrances))
	})
})
.catch(showError)
