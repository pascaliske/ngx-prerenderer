import { NgModuleFactory } from '@angular/core'
import { Routes } from '@angular/router'
import { promisify } from 'util'
import { readFile, writeFile } from 'fs'
import { join, dirname } from 'path'
import mkdirp from 'mkdirp'

/**
 * A render function for pre-rendering an Angular app.
 */
export type RendererFn = (routes: Routes, factory: NgModuleFactory<any>, map?: any) => Promise<void>

/**
 * Creates an async render function for pre-rendering an Angular app.
 *
 * @param renderModuleFactory
 * @param provideModuleMap
 * @returns - The pre-render function
 */
export function create(renderModuleFactory: any, provideModuleMap: any): RendererFn {
    // helper functions
    const readFileAsync = promisify(readFile)
    const writeFileAsync = promisify(writeFile)

    return async (routes: Routes, factory: NgModuleFactory<any>, map?: any): Promise<void> => {
        let colorize: (message: string) => string
        try {
            colorize = (await import('chalk')).default.cyan
        } catch {
            colorize = (message: string) => message
        }

        const paths = routes.map(route => route.path)
        const dist = (file: string) => join(process.cwd(), 'dist', 'app', file)
        const index = (await readFileAsync(dist('index.html'), 'utf8')).toString()

        for (const path of paths) {
            if (!path.includes('*')) {
                const file = dist(`${path || 'index'}.html`)
                const rendered = await renderModuleFactory(factory, {
                    url: path,
                    document: index,
                    extraProviders: map ? [provideModuleMap(map)] : [],
                })

                await mkdirp(dirname(file))
                await writeFileAsync(file, rendered)

                console.log(`rendered ${colorize('/' + path)} -> ${colorize(file)}`)
            }
        }
    }
}
