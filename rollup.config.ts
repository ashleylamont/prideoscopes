import typescript from "@rollup/plugin-typescript";

export default {
  input: 'src/sketch.ts',
  external: [
    'p5'
  ],
  output: {
    file: 'sketch.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      p5: 'p5'
    }
  },
  plugins: [
    typescript()
  ]
};
