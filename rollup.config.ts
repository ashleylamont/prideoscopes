import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';

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
    globals: {
      p5: 'p5',
      'object-hash': 'objectHash'
    }
  },
  plugins: [
    nodeResolve(),
    typescript()
  ]
};
