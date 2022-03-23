import { Whistle, load } from "../mod.ts";

const bits =  await new Whistle("export fn add(a: i32, b: i32): i32 { return a + b }").compile();

const { add  } = await load(bits);

console.log(add(40, 2));