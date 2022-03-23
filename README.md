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

## Module Usage Example

```ts
import { Whistle, load } from "https://deno.land/x/whistle@1.0.4/mod.ts";

const bits =  await new Whistle("export fn add(a: i32, b: i32): i32 { return a + b }").compile();

const { add  } = await load(bits);

console.log(add(40, 2));

```
