'use strict'

const stations = require('vbb-stations')('all')
const distance = require('gps-distance')

const south = 52.364699
const west = 13.158187
const north = 52.640563
const east = 13.640899
const bbox = [south, west, north, east].join(',')

const parentLookup = (type, id) => `\
[out:json];
${type}(${id});
<<;
out body;`

const elementName = (el) => {
	if (!el.tags) return null
	return el.tags.name || el.tags.description || null
}

const findCloseStation = (lat, lon) => {
	let match = null
	for (let s of stations) {
		const c = s.coordinates
		const d = distance(lat, lon, c.latitude, c.longitude)
		if (d < .15) {
			if (match) return null // more than one close-by station
			match = s
		}
	}
	return match
}

module.exports = {bbox, parentLookup, elementName, findCloseStation}
