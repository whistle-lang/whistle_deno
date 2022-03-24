# Whistle Deno

## CLI

### Installing

```

deno install -A -n whistle https://deno.land/x/whistle/cli.ts

```

### Usage 

```

whistle -h

```
## Examples

### Module Usage

```ts
import { Whistle, load } from "https://deno.land/x/whistle/mod.ts";

const bits =  await new Whistle("export fn add(a: i32, b: i32): i32 { return a + b }").compile();

const { add  } = await load(bits);

console.log(add(40, 2));

```
### Hello World

```ts
import { Whistle, load } from "https://deno.land/x/whistle/mod.ts";

const bits =  await new Whistle(`
// optional main function which runs by default
export fn main(): i32 {
    // prints Hello World to the console 
    printString("Hello World!")
    return 0
}
`).compile();

await load(bits)

```


