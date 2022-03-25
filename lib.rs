use wasm_bindgen::prelude::wasm_bindgen;

use whistle_ast::Grammar;
use whistle_common::TokenItem;
use whistle_compiler::compile_grammar;
use whistle_compiler::Compiler;
use whistle_compiler::CompilerError;
use whistle_lexer::*;
use whistle_parser::*;

#[derive(Debug)]
enum InternalError {
  Lexer(LexerError),
  Parser(ParserError),
  Compiler(Vec<CompilerError>),
}

fn lex_internal(text: &str) -> Result<Vec<TokenItem>, InternalError> {
  let lexer = Lexer::new(text);
  lexer
    .map(|item| item.map_err(InternalError::Lexer))
    .collect()
}

fn parse_internal(text: &str) -> Result<Grammar, InternalError> {
  let tokens = lex_internal(text)?;
  let parser = &mut Parser::new(tokens);
  parse_all(parser).map_err(InternalError::Parser)
}

fn compile_internal(text: &str) -> Result<Vec<u8>, InternalError> {
  let grammar = parse_internal(text)?;
  let compiler = &mut Compiler::new();
  compile_grammar(compiler, grammar).map_err(InternalError::Compiler)
}

#[wasm_bindgen]
pub fn lex(text: &str) -> Result<String, String> {
  lex_internal(text)
    .map(|ok| format!("{:#?}", ok))
    .map_err(|err| format!("{:#?}", err))
}

#[wasm_bindgen]
pub fn parse(text: &str) -> Result<String, String> {
  parse_internal(text)
    .map(|ok| format!("{:#?}", ok))
    .map_err(|err| format!("{:#?}", err))
}

#[wasm_bindgen]
pub fn compile(text: &str) -> Result<Vec<u8>, String> {
  compile_internal(text).map_err(|err| format!("{:#?}", err))
}
