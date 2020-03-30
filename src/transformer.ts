import { AST, NumberLiteral, StringLiteral, CallExpression, TargetCallExpression, ExpressionStatement } from "./types";
import traverser from "./traverser";

export default function transformer (ast: AST): AST {

    let newAst: AST = {
        type: "Program",
        body: []
    }

    // create a reference from source node to target node's children
    // this is used later to attach child nodes to their correct parent
    ast._context = newAst.body;

    traverser(ast, {
        NumberLiteral: {
            enter: handleNumberLiteral
        },
        StringLiteral: {
            enter: handleStringLiteral
        },
        CallExpression: {
            enter: handleCallExpression
        }
    })

    return newAst;
}

function handleNumberLiteral(node: NumberLiteral, parent: AST|CallExpression) {
    parent._context.push({
        type: "NumberLiteral",
        value: node.value
    })
}

function handleStringLiteral(node: StringLiteral, parent: AST|CallExpression) {
    parent._context.push({
        type: "StringLiteral",
        value: node.value
    })
}

function handleCallExpression(node: CallExpression, parent: AST|CallExpression) {

    let expression: TargetCallExpression|ExpressionStatement = {
        type: 'TargetCallExpression',
        callee: {
            type: 'Identifier',
            name: node.name,
        },
        arguments: [],
    };
    
    node._context = expression.arguments;

    // if our callExpression is not nested inside another callExpression,
    // but resides at the top-level, we need to wrap it in an ExpressionStatement
    // to properly end it in a semicolon later on during code generation
    if (parent.type === "Program") {
        expression = {
            type: "ExpressionStatement",
            expression: expression
        }
    }

    parent._context.push(expression);
}
