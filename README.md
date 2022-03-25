# Whistle Deno

## Examples

### Module Usage

```ts
import { compile } from "https://deno.land/x/whistle/mod.ts";

const bytes = compile("export fn add(a: i32, b: i32): i32 { return a + b }");
```
