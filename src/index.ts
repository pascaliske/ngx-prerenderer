import chalk from 'chalk'
import { NgModuleFactory } from '@angular/core'
import { Routes } from '@angular/router'
import { join, dirname } from 'path'
import { readFile, ensureDir, writeFile } from 'fs-extra'

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
    return async (routes: Routes, factory: NgModuleFactory<any>, map?: any): Promise<void> => {
        const paths = routes.map(route => route.path)
        const dist = (file: string) => join(process.cwd(), 'dist', 'app', file)
        const index = (await readFile(dist('index.html'), 'utf8')).toString()

        for (const path of paths) {
            if (!path.includes('*')) {
                const file = dist(`${path || 'index'}.html`)
                const rendered = await renderModuleFactory(factory, {
                    url: path,
                    document: index,
                    extraProviders: map ? [provideModuleMap(map)] : [],
                })

                await ensureDir(dirname(file))
                await writeFile(file, rendered)

                console.log(`rendered ${chalk.cyan('/' + path)} -> ${chalk.cyan(file)}`)
            }
        }
    }
}
