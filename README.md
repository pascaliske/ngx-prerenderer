# Angular Universal Prerenderer

[![npm (scoped)](https://img.shields.io/npm/v/@pascaliske/ngx-prerenderer.svg?style=flat-square)](https://www.npmjs.com/package/@pascaliske/ngx-prerenderer) [![GitHub Tag](https://img.shields.io/github/tag/pascaliske/ngx-prerenderer.svg?style=flat-square)](https://github.com/pascaliske/ngx-prerenderer) [![Build Status](https://img.shields.io/github/workflow/status/pascaliske/ngx-prerenderer/Test%20package/master?label=test&style=flat-square)](https://github.com/pascaliske/ngx-prerenderer/actions) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=pascaliske/ngx-prerenderer)](https://dependabot.com) [![GitHub Last Commit](https://img.shields.io/github/last-commit/pascaliske/ngx-prerenderer?style=flat-square)](https://github.com/pascaliske/ngx-prerenderer) [![Awesome Badges](https://img.shields.io/badge/badges-awesome-green.svg?style=flat-square)](https://github.com/Naereen/badges)

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

MIT © [Pascal Iske](https://pascaliske.dev)
