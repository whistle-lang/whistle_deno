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
        return Uint8Array.from(JSON.parse(compile(this.code)))
    }
}