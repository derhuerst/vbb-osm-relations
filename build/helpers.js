'use strict'

const stations = require('vbb-stations')('all')
const distance = require('gps-distance')

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
		const c = s.location
		const d = distance(lat, lon, c.latitude, c.longitude)
		if (d < .15) {
			if (match) return null // more than one close-by station
			match = s
		}
	}
	return match
}

module.exports = {parentLookup, elementName, findCloseStation}
