'use strict'

const lruCache = require('lru-cache')
const retry = require('p-retry')
const {fetch} = require('fetch-ponyfill')({Promise: require('pinkie-promise')})
const {stringify} = require('querystring')

const endpoint = 'https://overpass-api.de/api/interpreter'

const cache = lruCache({max: 1000})

const queryOverpass = (query) => {
	if (cache.has(query)) return Promise.resolve(cache.get(query))

	return retry(() => {
		return fetch(endpoint + '?' + stringify({data: query}), {
			// todo: decide on this
			// yields isomorphic code, but slower due to preflight request?
			// mode: 'cors',
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
			cache.set(query, data)
			return data
		})
	}, {minTimeout: 500})
}

module.exports = queryOverpass
