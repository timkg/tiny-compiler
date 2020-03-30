var assert = require("assert");
var compiler = require("../built/compiler").default;

describe("compiler", function () {
    it("transforms a nested callExpression", function () {
        var input = "(add 1 (subtract 2 3))"
        var generated = compiler(input);
        // console.log(JSON.stringify(generated, null, 2));
        assert.equal(generated, "add(1,subtract(2,3));");
    })
})
