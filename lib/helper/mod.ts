import { System } from "./system.ts";

function dirname(url: string) {
  return url.substring(0, url.lastIndexOf("/"));
}

export class WhistleHelper {
  // deno-lint-ignore no-explicit-any
  instance: any;
  async load(url: string | Uint8Array) {
    const imports = {
      sys: {
        printInt: System.printInt,
        printString: System.printString,
      },
    };
    const module = url instanceof Uint8Array ? await WebAssembly.compile(url): await WebAssembly.compileStreaming(
      fetch(Deno === undefined ? url : `${dirname(Deno.mainModule)}/${url}`),
    );
    const instance = await WebAssembly.instantiate(module, imports);
    System.memory = (instance.exports.memory as WebAssembly.Memory) ||
      undefined;
    // deno-lint-ignore no-explicit-any
    this.instance = instance as any;
    if (this.instance.exports.main) {
      this.instance.exports.main();
    }
    // deno-lint-ignore no-explicit-any
    return instance.exports as any;
  }
}

export async function load(url: string | Uint8Array) {
  return await new WhistleHelper().load(url);
}