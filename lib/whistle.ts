import init, {
    lex,
    parse,
    compile,
} from 'https://unpkg.com/whistle_web@0.1.1/whistle_web.js';

export class Whistle {
    #code: string;
    constructor(code:string) {
        this.#code = code;
    }

    async tokenize() {
        await init()
        return lex(this.#code)
    }
    async parse() {
        await init();
        return parse(this.#code)
    }

    async compile() {
        await init()
        let bits:any = compile(this.#code)
        var n:any = bits.lastIndexOf(",");
        bits = bits.slice(0, n) + bits.slice(n).replace(",", "");
        return Uint8Array.from(JSON.parse(bits))
    }
}