'use strict'

const slug = require('slug')
const shorten = require('vbb-short-station-name')
const stations = require('vbb-stations')('all')

const findStationByPlatform = (p) => {
	if (p.type !== 'way') throw new Error('unknown type ' + p.type)
	if (!p.tags.description) {
		throw new Error(`platform ${p.id} does not have a description field`)
	}
	// todo: resolve node coords to match by gps-distance

	const n1 = slug(shorten(p.tags.description))
	for (let s of stations) {
		const n2 = slug(n2)

		// todo: this is a very cheap algorithm, improve it
		if (n1.indexOf(n2) >= 0 || n2.indexOf(n1) >= 0) return s.id
	}

	return null
}
