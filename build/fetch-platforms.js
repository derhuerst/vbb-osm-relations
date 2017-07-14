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

const south = 52.364699
const west = 13.158187
const north = 52.640563
const east = 13.640899
const bbox = [south, west, north, east].join(',')

const endpoint = 'https://overpass-api.de/api/interpreter'
const query = `\
[out:json][timeout:25];
(
	way["public_transport"="platform"]["subway"="yes"](${bbox});
	way["railway"="platform"]["subway"="yes"](${bbox});
	relation["public_transport"="platform"]["subway"="yes"](${bbox});
	relation["railway"="platform"]["subway"="yes"](${bbox});
);
out body;
>;
out skel qt;`

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
		try {
			const id = findStationByPlatform(platform)
			platforms[id] = platform.id
			console.log(`platform ${platform.id} -> station ${id}`)
		} catch (err) {
			console.error(err.message)
		}
	}

	fs.writeFileSync(dest, JSON.stringify(platforms))
})
.catch(showError)
