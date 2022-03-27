import { compile, lex, load, parse } from "../mod.ts";
import { System } from "./utils.ts";

const code = `
export fn add(a: i32, b: i32): i32 {
    return a + b
}
`;
// Load the wasm module
await load();
// Lex the code
const tokens = lex(code);
console.log(tokens);
// Parse the code
const ast = parse(code);
console.log(ast);
// Compile the code
const wasm = compile(code);
const module = await WebAssembly.compile(wasm);

const imports = {
  sys: {
    printInt: System.printInt,
    printString: System.printString,
  },
};
// Instantiate the module
const instance = await WebAssembly.instantiate(module, imports);
// Get the exported function
const { add } = instance.exports as { add: (a: number, b: number) => number };
// Call the exported function
const result = add(40, 2);
console.log(result);
