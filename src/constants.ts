interface TOKEN_TYPES_I {
    readonly "PAREN": "PAREN";
    readonly "NUMBER": "NUMBER";
    readonly "STRING": "STRING";
    readonly "NAME": "NAME";
}

export const TOKEN_TYPES: TOKEN_TYPES_I = Object.freeze({
    "PAREN": "PAREN",
    "NUMBER": "NUMBER",
    "STRING": "STRING",
    "NAME": "NAME"
})

interface NODE_TYPES_I {
    readonly "Program": "Program";
    readonly "NumberLiteral": "NumberLiteral";
    readonly "StringLiteral": "StringLiteral";
    readonly "CallExpression": "CallExpression";
}

export const NODE_TYPES: NODE_TYPES_I = Object.freeze({
    "Program": "Program",
    "NumberLiteral": "NumberLiteral",
    "StringLiteral": "StringLiteral",
    "CallExpression": "CallExpression"
})
