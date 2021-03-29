import { Whistle } from '../mod.ts'

(async ()=> {
    console.log(await new Whistle("export fun add(a: i32, b: i32): i32 { return a + b }").parse())
})()