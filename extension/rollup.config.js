import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import css from 'rollup-plugin-css-only';
import json from '@rollup/plugin-json';
import fs from "fs";
import path from "path";

const plugins = [
  typescript({
    tsconfig: "webviews/tsconfig.json",
    experimentalDecorators: true,
		module: 'es2015',
		sourceMap: true,
		inlineSources: false,
	}),
	replace({
		'process.env.NODE_ENV': JSON.stringify('development'),
		'process.env.VUE_ENV': JSON.stringify('browser'),
		'process.env': JSON.stringify('')
	}),
	css(),
	json(),
	vue({
		css: false
	}),
	commonjs(),
	// Enable to import modules via "import"
	nodeResolve(),
	nodePolyfills(),
	babel({
		exclude: 'node_modules/**'
	}),
];

const config = fs
.readdirSync(path.join(__dirname, "webviews", "pages"))
.map((input) => {
	const name = input.split(".")[0];
	return {
		input: "webviews/pages/" + input,
		output: {
			sourcemap: true,
			format: "iife",
			name: "app",
			file: "out/" + name + ".js",
			globals: {
				"process": "process",
				"buffer": "buffer",
				"https": "https",
			},
		},
		plugins
	};
});
export default config;