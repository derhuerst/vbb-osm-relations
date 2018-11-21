'use strict'

const LruCache = require('lru-cache')
const queryOverpass = require('@derhuerst/query-overpass')

const cache = new LruCache({max: 1000})

const cachedQueryOverpass = (query) => {
	if (cache.has(query)) return Promise.resolve(cache.get(query))

	return queryOverpass(query)
	.then((data) => {
		cache.set(query, data)
		return data
	})
}

module.exports = cachedQueryOverpass
