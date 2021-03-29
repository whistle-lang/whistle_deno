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

```

import { Whistle } from "https://deno.land/x/whistle@1.0.1/mod.ts";

(async () => {
    let whistle = await new Whistle("export fun add(a: i32, b: i32): i32 { return a + b }")

    let bits = await whistle.compile()

    WebAssembly.compile(bits)
        .then(module => WebAssembly.instantiate(module, {
            imports: {
                imported_func: arg => console.log(arg)
            }
        }))
        .then(instance => console.log(instance.exports.add(2, 7)));
})()

```
