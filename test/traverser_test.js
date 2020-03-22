var assert = require("assert");
var traverser = require("../built/traverser.js");
var parser = require("../built/parser");
var tokenizer = require("../built/tokenizer");

describe("traverser", function () {
    it("runs", function () {
        var input = "(add 1 1)";
        var ast = parser(tokenizer(input));

        traverser(ast, {});
        assert.equal(1, 1);
    })
})
