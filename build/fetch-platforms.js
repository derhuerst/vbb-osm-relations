'use strict'

const path = require('path')
const {fetch} = require('fetch-ponyfill')({Promise: require('pinkie-promise')})
const {stringify} = require('querystring')
const fs = require('fs')

const findStationByPlatform = require('./find-station-by-platform')

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const endpoint = 'http://overpass-api.de/api/interpreter'
const query = `\
	// todo
`
const dest = path.join(__dirname, '../platforms.json')

fetch(endpoint + '?' + stringiy({data: query}), {
	mode: 'cors',
	redirect: 'follow',
	headers: {
		accept: 'application/json',
		'user-agent': 'http://github.com/derhuerst/vbb-osm-relations'
	}
})
.then((res) => {
	if (!res.ok) {
		const err = new Error(res.statusText)
		err.statusCode = res.status
		throw err
	}
	return res.json()
})
.then((data) => {
	const platforms = {} // OSM IDs by VBB station ID
	for (let platform of data.elements) {
		const id = findStationByPlatform(platform)
		if (id) {
			console.log(`platform ${platform.id} -> station ${id}`)
			platforms[id] = platform.id
		} else console.error(`platform ${platform.id} does not match`)
	}

	fs.writeFileSync(dest, JSON.stringify(platforms))
})
.catch(showError)
