'use strict'

const parentLookup = (type, id) => `\
[out:json];
${type}(${id});
<<;
out body;`

const platformName = (p) => {
	if (!p.tags) return null
	return p.tags.name || p.tags.description || null
}

module.exports = {parentLookup, platformName}
