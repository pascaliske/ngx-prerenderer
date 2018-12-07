# Angular Universal Prerenderer

[![Build Status](https://travis-ci.com/pascaliske/ngx-prerenderer.svg?branch=master)](https://travis-ci.com/pascaliske/ngx-prerenderer) [![Greenkeeper badge](https://badges.greenkeeper.io/pascaliske/ngx-prerenderer.svg)](https://greenkeeper.io/)

## Installation

To install the module use the following commands:

```bash
$ yarn add @pascaliske/ngx-prerenderer
```

## Usage

Create a `.ts`-File and place the following inside:

```typescript
import 'reflect-metadata'
import 'zone.js/dist/zone-node'
import { enableProdMode } from '@angular/core'
import { renderModuleFactory } from '@angular/platform-server'
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader'
import { create } from '@pascaliske/ngx-prerenderer'
import { routes } from './app/app-routing.module'

enableProdMode()

// tslint:disable-next-line
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('../dist/server/main')
const prerender = create(renderModuleFactory, provideModuleMap)

prerender(routes, AppServerModuleNgFactory, LAZY_MODULE_MAP)
    .then(() => {
        console.log('==> done')
    })
    .catch(error => {
        console.log(error)
        process.exit(1)
    })

```

## License

MIT © [Pascal Iske](https://pascal-iske.de)
