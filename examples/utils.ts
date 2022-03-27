export const readString = (
  ptr: number,
  memory?: WebAssembly.Memory,
): string | undefined => {
  if (memory === undefined) return;
  const view = new Uint8Array(memory.buffer);
  let end = ptr;
  while (view[end]) ++end;
  return (new TextDecoder()).decode(new Uint8Array(view.subarray(ptr, end)));
};

export class System {
    static memory?: WebAssembly.Memory;
    static printInt(arg: number) {
      console.log(arg);
    }
    static printString(arg: number) {
      console.log(readString(arg, System.memory!));
    }
  }