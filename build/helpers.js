'use strict'

const parentLookup = (type, id) => `\
[out:json];
${type}(${id});
<<;
out body;`

module.exports = {parentLookup}
