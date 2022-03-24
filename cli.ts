import Denomander from "https://deno.land/x/denomander@0.9.1/mod.ts";
import { load, Whistle } from "./mod.ts";

const program: Denomander = new Denomander({
  app_name: "Whistle",
  app_description: "A Deno CLI for the Whistle Programming Language",
  app_version: "v0.2.1",
});

program
  .command("compile [file]")
  .option("-o --output", "create output file")
  .action(async ({ file }: { file: string }) => {
    const text = await Deno.readTextFile(
      file.includes(".whi") ? file : `${file}.whi`,
    );

    const output = await new Whistle(file).compile();
    console.log(output);
    program.output
      ? await Deno.writeFile(program.output, output)
      : console.log(output);
  });

program
  .command("build [dir]")
  .action(async ({ dir }: { dir: string }) => {
    for await (const dirEntry of Deno.readDir(dir)) {
      if (dirEntry.name.includes(".whi")) {
        const response = await Deno.readTextFile(`${dir}/${dirEntry.name}`);
        const output = await new Whistle(response).compile();
        await Deno.writeFile(
          `${dir}/${dirEntry.name.replace(".whi", ".wasm")}`,
          output,
        );
      }
    }
  });

program
  .command("tokenize [file]")
  .action(async ({ file }: { file: string }) => {
    const text = await Deno.readTextFile(
      file.includes(".whi") ? file : `${file}.whi`,
    );
    console.log(await new Whistle(text).tokenize());
  });
program
  .command("parse [file]")
  .action(async ({ file }: { file: string }) => {
    const text = await Deno.readTextFile(
      file.includes(".whi") ? file : `${file}.whi`,
    );
    console.log(await new Whistle(text).parse());
  });
program
  .command("run [file]")
  .action(async ({ file }: { file: string }) => {
    const bits = file.includes(".wasm")
      ? await Deno.readFile(file)
      : await new Whistle(file).compile();
    await load(bits);
  });

program.parse(Deno.args);
