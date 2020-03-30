import tokenizer from "./tokenizer";
import parser from "./parser";
import transformer from "./transformer";
import codeGenerator from "./code-generator";

export default function compiler(input: string): string {
    let tokens = tokenizer(input);
    let ast    = parser(tokens);
    let newAst = transformer(ast);
    let output = codeGenerator(newAst);
  
    return output;
}
