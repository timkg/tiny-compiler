import { Node } from "./types";

export default function codeGenerator(node: Node): string {

    switch (node.type) {

        case "Program":
            return node.body.map(codeGenerator).join("\n");

        case "ExpressionStatement":
            return codeGenerator(node.expression) + ";"

        case "TargetCallExpression":
            return `${codeGenerator(node.callee)}(${node.arguments.map(codeGenerator)})`;

        case 'Identifier':
            return node.name;

        case 'NumberLiteral':
            return node.value.toString();

        case 'StringLiteral':
            return `"${node.value}"`;

        default:
            throw new TypeError(node.type);

    }

}
