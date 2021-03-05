import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

const plugins = [
  typescript({
    tsconfig: "webviews/tsconfig.json",
    experimentalDecorators: true,
		module: 'es2015',
		sourceMap: false,
		inlineSources: false,
	}),
	replace({
		'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.VUE_ENV': JSON.stringify('browser'),
	}),
	vue(),
	commonjs(),
	// Enable to import modules via "import"
	nodeResolve(),
	babel({
		exclude: 'node_modules/**'
	}),
];

export default {
	entry: 'webviews/pages/HelloWorld.ts',
  input: 'webviews/pages/HelloWorld.ts',
  output: {
		file: 'out/main.js',
		format: 'umd',
		name: 'VuecExamples'
  },
	// Browser format (Immediately-invoked function expression)
	format: 'iife',
  plugins
};