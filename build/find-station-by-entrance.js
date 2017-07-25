'use strict'

const slug = require('slug')
const shorten = require('vbb-short-station-name')
const stations = require('vbb-stations')('all')

const queryOverpass = require('./query-overpass')
const {parentLookup, elementName, findCloseStation} = require('./helpers')

const tokenize = (name) => {
	return slug(name)
	.toLowerCase()
	.replace(/^u-bahnhof-/, 'u-')
	.replace(/-u-bahnhof-/, '-u-')
}

const queryParents = (type, id) => queryOverpass(parentLookup(type, id))

const match = (osmName, vbbName) => {
	// todo: this is a very cheap algorithm, improve it
	// fails with "S+U Hauptbahnhof" & "U Hauptbahnhof"
	return osmName.indexOf(vbbName) >= 0 || vbbName.indexOf(osmName) >= 0
}

const findStationByEntrance = (e) => {
	if (e.type !== 'node') {
		return Promise.reject(new Error(e.id + ' unknown type ' + e.type))
	}

	// todo: resolve node coords to match by gps-distance

	// try to match a station by own name
	const name = elementName(e)
	if (name) {
		const osm = tokenize(shorten(name))
		for (let s of stations) {
			const vbb = tokenize(s.name)
			if (match(osm, vbb)) return Promise.resolve(s.id)
		}
	}

	return queryParents('node', e.id)
	.then((parents) => {
		for (let parent of parents) {
			const name = elementName(parent)
			if (!name) continue

			const osm = tokenize(shorten(name))
			for (let s of stations) {
				const vbb = tokenize(s.name)

				if (match(osm, vbb)) return s.id
			}
		}

		// try to match a single close-by station
		const closeBy = findCloseStation(e.lat, e.lon)
		if (closeBy) return closeBy.id

		throw new Error(`entrance ${e.id} (${name}) does not match`)
	})
}

module.exports = findStationByEntrance
