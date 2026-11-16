// Drop-in faster marked: parse(markdown) returns the HTML marked 18.1.3 renders
// with its defaults (GFM on, async off). Vendored marked is byte-for-byte npm build (MIT).
import { marked } from './vendor/marked/marked.esm.js';
export function parse(markdown) {
  return marked.parse(markdown);
}
