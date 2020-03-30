var assert = require("assert");
var traverser = require("../built/traverser.js").default;
var parser = require("../built/parser").default;
var tokenizer = require("../built/tokenizer").default;

function withInput(input, cb) {
    var tokens = tokenizer(input);
    var ast = parser(tokens);
    
    cb(ast);
}

describe("traverser", function () {
    it("calls enter cb", function (done) {
        withInput("(add 1 2)", (ast) => {
            let called = false;

            const visitors = {
                "CallExpression": {
                    enter: function () {
                        called = true
                    }
                }
            };

            traverser(ast, visitors);

            assert.equal(called, true);
            done();
        })
    })

    it("does not call enter cb of unrelated nodes", function (done) {
        withInput("(add 1 2)", (ast) => {
            let called = false;

            const visitors = {
                "StringLiteral": {
                    enter: function () {
                        called = true
                    }
                }
            };

            traverser(ast, visitors);

            assert.equal(called, false);
            done();
        })
    })

    it("calls exit cb", function (done) {
        withInput("(add 1 2)", (ast) => {
            let called = false;

            const visitors = {
                "CallExpression": {
                    exit: function () {
                        called = true
                    }
                }
            };

            traverser(ast, visitors);

            assert.equal(called, true);
            done();
        })
    })

    it("does not call exit cb of unrelated nodes", function (done) {
        withInput("(add 1 2)", (ast) => {
            let called = false;

            const visitors = {
                "StringLiteral": {
                    exit: function () {
                        called = true
                    }
                }
            };

            traverser(ast, visitors);

            assert.equal(called, false);
            done();
        })
    })
})
