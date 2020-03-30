import { NODE_TYPES, TOKEN_TYPES } from "./constants";
import { TokenArray, Name } from "./tokenizer";

export interface NumberLiteral {
    type: "NumberLiteral";
    value: number;
}

export interface StringLiteral {
    type: "StringLiteral";
    value: string;
}

export interface CallExpression {
    type: "CallExpression";
    name: string;
    params: Array<NumberLiteral | CallExpression>;
    _context?: any;
}

export interface AST {
    type: "Program";
    body: Array<Node>;
    _context?: any;
}

export type Node = NumberLiteral | StringLiteral | CallExpression | AST;

export default function parser (tokens: TokenArray): AST {

    let current = 0;
    
    function walk(): NumberLiteral | StringLiteral | CallExpression {

        let token = tokens[current];

        if (token.type === TOKEN_TYPES.NUMBER) {
            current++;

            return {
                type: NODE_TYPES.NumberLiteral,
                value: token.value
            }
        }

        if (token.type === TOKEN_TYPES.STRING) {
            current++;

            return {
                type: NODE_TYPES.StringLiteral,
                value: token.value
            }
        }

        if (
            token.type === TOKEN_TYPES.PAREN && 
            token.value === "("
        ) {
            // skip left paren - after left paren comes a Name token
            token = (tokens[++current] as Name);

            // save name for later
            const callExpressionName: string = token.value;

            let callExpressionParams = [];

            // skip name token - after name token come the arguments to the CallExpression
            token = tokens[++current];

            // iterate over arguments to CallExpression,
            // inserting resulting Nodes to the CallExpression's list of parameters.
            while (
                (token.type !== TOKEN_TYPES.PAREN) ||
                (token.type === TOKEN_TYPES.PAREN && token.value !== ")")
            ) {
                callExpressionParams.push(walk());
                token = tokens[current];
            }

            // skip closing parens
            current++;

            return {
                type: NODE_TYPES.CallExpression,
                name: callExpressionName,
                params: callExpressionParams
            };
        }

        throw new TypeError(token.type);
    }

    let ast: AST = {
        type: "Program",
        body: []
    };

    while(current < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}