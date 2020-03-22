var assert = require("assert");

var parser = require("../built/parser");
var tokenizer = require("../built/tokenizer");

var { NODE_TYPES } = require("../built/constants");

function withInput(input, cb) {
    var tokens = tokenizer(input);

    var ast = parser(tokens);

    return cb(ast);
}

describe("parser", function () {
    it("parses a number literal", function () {
        var input = "123";
        var tokens = tokenizer(input);
        var ast = parser(tokens);

        assert.equal(ast.body[0].type, NODE_TYPES.NumberLiteral);
    })

    it("parses multiple number literals", function () {
        var input = "1 2";
        var tokens = tokenizer(input);
        var ast = parser(tokens);

        assert.equal(ast.body[0].type, NODE_TYPES.NumberLiteral);
        assert.equal(ast.body[1].type, NODE_TYPES.NumberLiteral);
        assert.equal(ast.body.length, 2);
    })

    it("parses a string literal", function (done) {
        withInput('"abc"', (ast) => {
            assert.equal(ast.body[0].type, NODE_TYPES.StringLiteral);
            done();
        })
    })

    it("parses a call expression", function (done) {
        withInput("(add 3 4)", (ast) => {
            assert.equal(ast.body[0].type, NODE_TYPES.CallExpression);
            assert.equal(ast.body[0].params.length, 2);
            
            assert.equal(ast.body[0].params[0].value, 3);
            assert.equal(ast.body[0].params[0].type, NODE_TYPES.NumberLiteral);

            assert.equal(ast.body[0].params[1].value, 4);
            assert.equal(ast.body[0].params[1].type, NODE_TYPES.NumberLiteral);
            done();
        })
    })

    it("parses a nested call expression", function (done) {
        withInput("(add 3 (add 1 2))", (ast) => {
            assert.equal(ast.body[0].type, NODE_TYPES.CallExpression);
            assert.equal(ast.body[0].name, "add");
            assert.equal(ast.body[0].params.length, 2);
            
            assert.equal(ast.body[0].params[0].value, 3);
            assert.equal(ast.body[0].params[0].type, NODE_TYPES.NumberLiteral);

            assert.equal(ast.body[0].params[1].type, NODE_TYPES.CallExpression);
            assert.equal(ast.body[0].params[1].name, "add");
            
            assert.equal(ast.body[0].params[1].params.length, 2);
            assert.equal(ast.body[0].params[1].params[0].type, NODE_TYPES.NumberLiteral);
            assert.equal(ast.body[0].params[1].params[0].value, 1);
            assert.equal(ast.body[0].params[1].params[1].type, NODE_TYPES.NumberLiteral);
            assert.equal(ast.body[0].params[1].params[1].value, 2);
            done();
        })
    })

})
