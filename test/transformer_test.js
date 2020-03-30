var assert = require("assert");
var transformer = require("../built/transformer").default;
var parser = require("../built/parser").default;
var tokenizer = require("../built/tokenizer").default;

function withInput(input, cb) {
    var tokens = tokenizer(input);
    var ast = parser(tokens);
    var newAst = transformer(ast);
    
    cb(newAst);
}

describe("transformer", function () {
    it("transforms a NumberLiteral", function (done) {
        withInput("1", ast => {
            // console.log(JSON.stringify(ast, null, 2))
            assert.equal(ast.body.length, 1)
            assert.equal(ast.body[0].type, "NumberLiteral")
            assert.equal(ast.body[0].value, 1)
            done();
        })
    })

    it("transforms a StringLiteral", function (done) {
        withInput('"Hello"', ast => {
            // console.log(JSON.stringify(ast, null, 2))
            assert.equal(ast.body.length, 1)
            assert.equal(ast.body[0].type, "StringLiteral")
            assert.equal(ast.body[0].value, "Hello")
            done();
        })
    })

    it("transforms a top-level CallExpression", function (done) {
        withInput("(add 1 2)", ast => {
            // console.log(JSON.stringify(ast, null, 2))
            assert.equal(ast.body.length, 1)
            assert.equal(ast.body[0].type, "ExpressionStatement")
            assert.equal(ast.body[0].expression.type, "CallExpression")
            assert.equal(ast.body[0].expression.callee.type, "Identifier")
            assert.equal(ast.body[0].expression.callee.name, "add")
            assert.equal(ast.body[0].expression.arguments.length, 2)
            assert.equal(ast.body[0].expression.arguments[0].value, 1)
            assert.equal(ast.body[0].expression.arguments[1].value, 2)

            done();
        })
    })

    it("transforms a nested CallExpression", function (done) {
        withInput("(add 1 (add 2 3))", ast => {
            // console.log(JSON.stringify(ast, null, 2))
            assert.equal(ast.body[0].expression.arguments[1].type, 'CallExpression');
            assert.equal(ast.body[0].expression.arguments[1].arguments[0].value, 2);
            assert.equal(ast.body[0].expression.arguments[1].arguments[1].value, 3);

            done();
        })
    })
})
