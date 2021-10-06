import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: 'src/sketch.ts',
  external: [
    'p5',
    'objectHash'
  ],
  output: {
    file: 'sketch.js',
    format: 'iife',
    sourcemap: true,
    name: 'sketch',
    globals: {
      p5: 'p5',
      'object-hash': 'objectHash'
    }
  },
  plugins: [
    nodeResolve({
      browser: true
    }),
    commonjs({
      transformMixedEsModules: true,
      esmExternals: true
    }),
    typescript()
  ]
};
