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

export interface ExpressionStatement {
    type: "ExpressionStatement";
    expression: TargetCallExpression;
}

export interface Identifier {
    type: "Identifier";
    name: string;
}

export interface TargetCallExpression {
    type: "TargetCallExpression";
    callee: Identifier;
    arguments: Array<StringLiteral | TargetCallExpression>;
}

export type Node = NumberLiteral | StringLiteral | CallExpression | ExpressionStatement | AST;
