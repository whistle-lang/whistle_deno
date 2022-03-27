import { compile, lex, load, parse } from "../mod.ts";
import { System } from "./utils.ts";
const code = `
export fn helloWorld(): i32 {
    printString("Hello, world!")
    return 0
}`;

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
System.memory = (instance.exports.memory as WebAssembly.Memory) || undefined;
// Get the exported function
const { helloWorld } = instance.exports as { helloWorld: () => number };
// Call the exported function which prints "Hello, world!"
helloWorld();
