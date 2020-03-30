var assert = require("assert");
var codeGenerator = require("../built/code-generator").default;
var transformer = require("../built/transformer").default;
var parser = require("../built/parser").default;
var tokenizer = require("../built/tokenizer").default;

function withInput(input, cb) {
    var tokens = tokenizer(input);
    var ast = parser(tokens);
    var newAst = transformer(ast);
    
    cb(newAst);
}

describe("codeGenerator", function () {
    it("wraps a string literal in quotes", function (done) {
        withInput('"hello"', ast => {
            var generated = codeGenerator(ast);
            // console.log(JSON.stringify(generated, null, 2));
            assert.equal(generated, '"hello"');
            done();
        })
    })

    it("returns a numberLiteral", function (done) {
        withInput('1', ast => {
            var generated = codeGenerator(ast);
            // console.log(JSON.stringify(generated, null, 2));
            assert.equal(generated, "1");
            done();
        })
    })

    it("transforms a callExpression and ends it with a semicolon", function (done) {
        withInput('(add 1 2)', ast => {
            var generated = codeGenerator(ast);
            // console.log(JSON.stringify(generated, null, 2));
            assert.equal(generated, "add(1,2);");
            done();
        })
    })

    it("transforms a nested callExpression", function (done) {
        withInput('(add 1 (add 2 3))', ast => {
            var generated = codeGenerator(ast);
            // console.log(JSON.stringify(generated, null, 2));
            assert.equal(generated, "add(1,add(2,3));");
            done();
        })
    })
})
