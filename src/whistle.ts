import init, {
    lex,
    parse,
    compile,
    source
} from './pkg/wasm.js';

export class Whistle {
    private code: string;
    constructor(code:string) {
        this.code = code;
    }

    public async tokenize() {
        await init(source)
        return lex(this.code)
    }
    public async parse() {
        await init(source);
        return parse(this.code)
    }

    public async compile() {
        await init(source)
        let bits:any = compile(this.code)
        var n:any = bits.lastIndexOf(",");
        bits = bits.slice(0, n) + bits.slice(n).replace(",", "");
        return Uint8Array.from(JSON.parse(bits))
    }
}