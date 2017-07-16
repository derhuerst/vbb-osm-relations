'use strict'

const parentLookup = (type, id) => `\
[out:json];
${type}(${id});
<<;
out body;`

const elementName = (el) => {
	if (!el.tags) return null
	return el.tags.name || el.tags.description || null
}

module.exports = {parentLookup, elementName, platformProduct}
