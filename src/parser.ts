var { NODE_TYPES, TOKEN_TYPES } = require("./constants");

function parser (tokens) {

    let current = 0;
    
    function walk() {

        
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
            // skip left paren
            token = tokens[++current];

            // initialize CallExpression node
            let node = {
                type: NODE_TYPES.CallExpression,
                name: token.value,
                params: []
            }

            // skip name token
            token = tokens[++current];

            // iterate over arguments to CallExpression,
            // inserting resulting Nodes to the CallExpression's list of parameters.
            while (
                (token.type !== TOKEN_TYPES.PAREN) ||
                (token.type === TOKEN_TYPES.PAREN && token.value !== ")")
            ) {
                node.params.push(walk());
                token = tokens[current];
            }

            // skip closing parens
            current++;

            return node;
        }

        throw new TypeError(token.type);
    }

    let ast = {
        type: NODE_TYPES.PROGRAM,
        body: []
    };

    while(current < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}

module.exports = parser;
