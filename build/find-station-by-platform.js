'use strict'

const slug = require('slug')
const shorten = require('vbb-short-station-name')
const stations = require('vbb-stations')('all')

const queryOverpass = require('./query-overpass')

const parentLookup = (type, id) => `\
[out:json];
${type}(${id});
<<;
out body;`

const queryParentNames = (type, id) => {
	return queryOverpass(parentLookup('way', id))
	.then((data) => {
		return data.elements.reduce((names, el) => {
			const member = el.members.find((m) => m.ref === id)
			if (!member || member.role !== 'platform') return names
			const name = el.tags && el.tags.name || el.tags.description
			if (name) names.push(name)
			return names
		}, [])
	})
}

const findStationByPlatform = (p) => {
	if (p.type !== 'way') {
		return Promise.reject(new Error('unknown type ' + p.type))
	}

	// todo: resolve node coords to match by gps-distance

	// try to match a station by own name
	const name = p.tags && p.tags.name || p.tags.description
	const n1 = slug(shorten(name))
	for (let s of stations) {
		const n2 = slug(s.name)

		// todo: this is a very cheap algorithm, improve it
		if (n1.indexOf(n2) >= 0 || n2.indexOf(n1) >= 0) return Promise.resolve(s.id)
	}

	return queryParentNames('way', p.id)
	.then((names) => {
		for (let name of names) {
			const n1 = slug(shorten(name))
			for (let s of stations) {
				const n2 = slug(s.name)

				// todo: this is a very cheap algorithm, improve it
				if (n1.indexOf(n2) >= 0 || n2.indexOf(n1) >= 0) return s.id
			}
		}

		throw new Error(`platform ${p.id} does not match`)
	})
}

module.exports = findStationByPlatform
