import { AST, Node } from "./parser";

type nodeCallback = (node: Node, parent?: Node) => any

interface visitors_i {
    Program?: {
        enter?: nodeCallback;
        exit?: nodeCallback;
    }
    NumberLiteral?: {
        enter?: nodeCallback;
        exit?: nodeCallback;
    }
    StringLiteral?: {
        enter?: nodeCallback;
        exit?: nodeCallback;
    }
    CallExpression?: {
        enter?: nodeCallback;
        exit?: nodeCallback;
    }
}

export default function traverser (ast: AST, visitors: visitors_i) {

    function traverseArray(array: Node[], parent: Node) {
        array.forEach((element) => {
            traverseNode(element, parent);
        });
    }

    function traverseNode(node: Node, parent?: Node) {
        const methods = visitors[node.type];

        if (methods && methods.enter) {
            methods.enter(node, parent);
        }

        // iterate over Node children
        switch (node.type) {

            case "Program":
                traverseArray(node.body, node);
                break;

            case "CallExpression":
                traverseArray(node.params, node);
                break;

            // NumberLiteral and StringLiteral don't have children,
            // so nothing needs to happen for those.
            case 'NumberLiteral':
            case 'StringLiteral':
                break;

            // the default case below is supposed to throw when encountering an unsupported node type,
            // but TypeScript is smart enough to let us know that all possible cases have been covered above.
            // default:
            //     throw new TypeError(node.type);
        }

        if (methods && methods.exit) {
            methods.exit(node, parent);
        }
    }

    traverseNode(ast, null)
}

