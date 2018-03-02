# *vbb-osm-relations*

**VBB lines, platforms and station entrances and their [OSM](https://openstreetmap.org/) relations.**

Almost all VBB infrastructure is mapped in OSM, but the individual elements are not always tagged with the station they belong to. This module contains those that can be matched with VBB stations *without ambiguity*, either by distance or by similar names.

**The intended future state is that all lines, platforms and entrances are tagged with proper, machine-readable VBB IDs. Right now, this is a brittle hack to still make use of the data.**

[![npm version](https://img.shields.io/npm/v/vbb-osm-relations.svg)](https://www.npmjs.com/package/vbb-osm-relations)
[![build status](https://app.codeship.com/projects/faaded10-4d47-0135-ea45-72e8c5ccfe37/status?branch=master)](https://app.codeship.com/projects/233154)
[![dependency status](https://img.shields.io/david/derhuerst/vbb-osm-relations.svg)](https://david-dm.org/derhuerst/vbb-osm-relations)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/vbb-osm-relations.svg)](https://david-dm.org/derhuerst/vbb-osm-relations#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-osm-relations.svg)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm install vbb-osm-relations
```

## Usage

Each value is an [OSM element ID](#todo):

```js
const lines = require('vbb-osm-relations/lines')
lines.U7 // 58425

const platforms = require('vbb-osm-relations/platforms.json')
platforms['900000056104'] // U Bülowstr.
// [ 391385382, 391385383 ]

const entrances = require('vbb-osm-relations/entrances.json')
entrances['900000130011'] // U Vinetastr.
// [ 2714518751, 2714518752, 2714518753, 2714518755, 2714518758, 2714518760 ]
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/vbb-osm-relations/issues).
