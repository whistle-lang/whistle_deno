import Denomander from "https://deno.land/x/denomander/mod.ts";
import { Whistle } from "./mod.ts"


const program: any = new Denomander({
    app_name: "Whistle",
    app_description: "A Deno CLI for the Whistle Programming Language",
    app_version: "1.0.1",
});


program
    .command("compile [file]")
    .option("-o --output", "create output file")
    .action(async ({ file }: { file: string }) => {
        let text: any;
        if (file.includes(".whi")) {
            text = Deno.readTextFile(file)
        } else {
            text = Deno.readTextFile(`${file}.whi`)
        }
        text.then(async (response: string) => {
            let output: any = await new Whistle(response).compile()
            console.log(output)
            if (program.output) {
                await Deno.writeFile(program.output, output)
            }
        });
    });

program
    .command("tokenize [file]")
    .action(async ({ file }: { file: string }) => {
        let text: any;
        console.log("hi")
        if (file.includes(".whi")) {
            text = Deno.readTextFile(file)
        } else {
            text = Deno.readTextFile(`${file}.whi`)
        }
        text.then(async (response: string) => {
            console.log(await new Whistle(response).tokenize())
        });
    });
program
    .command("parse [file]")
    .action(async ({ file }: { file: string }) => {
        let text: any;
        if (file.includes(".whi")) {
            text = Deno.readTextFile(file)
        } else {
            text = Deno.readTextFile(`${file}.whi`)
        }
        text.then(async (response: string) => {
            console.log(await new Whistle(response).parse())
        });
    });

program.parse(Deno.args);
