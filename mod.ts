import * as wasm from "./wasm.js";

await wasm.default(wasm.source);

function lex(source: string): string {
  return wasm.lex(source);
}

function parse(source: string): string {
  return wasm.parse(source);
}

function compile(source: string): Uint8Array {
  return wasm.compile(source) as Uint8Array;
}
