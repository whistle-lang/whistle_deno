import { Whistle, load } from "../mod.ts";

const bits =  await new Whistle(`
// optional main function runs by default
export fn main(): i32 {
    // prints Hello World to the console 
    printString("Hello World!")
    return 0
}
`).compile();

await load(bits);