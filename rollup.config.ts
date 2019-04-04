import clear from 'rollup-plugin-clear'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import { module, main, dependencies, peerDependencies } from './package.json'

export default () => ({
    input: 'src/index.ts',
    output: [
        {
            format: 'cjs',
            file: main,
        },
        {
            format: 'es',
            file: module,
        },
    ],
    external: [...Object.keys(dependencies || {}), ...Object.keys(peerDependencies || {}), 'path'],
    plugins: [
        clear({
            targets: ['dist'],
            watch: true,
        }),
        typescript({
            typescript: require('typescript'),
        }),
        terser(),
    ],
})
