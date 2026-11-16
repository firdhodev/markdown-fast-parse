// Driver: read markdown cases, render each one, and emit the HTML strings.
//
// Environment:
//   MAKEFUN_INPUT_DIR  - directory holding cases.json (default /input)
//   MAKEFUN_OUTPUT_DIR - directory to write html.json into (default /output)
//
// cases.json is a JSON array of { id, markdown }; html.json is a JSON array of
// rendered HTML strings in the same order. Authored for this entry point.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from './parse.js';

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const casesPath = join(inputDir, 'cases.json');
const raw = readFileSync(casesPath, 'utf8');
const cases: Array<{ id: string; markdown: string }> = JSON.parse(raw);

const htmlStrings = cases.map((testCase) => parse(testCase.markdown));

mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, 'html.json');
writeFileSync(outPath, JSON.stringify(htmlStrings) + '\n', 'utf8');

console.log(`wrote ${htmlStrings.length} rendered cases to ${outPath}`);
