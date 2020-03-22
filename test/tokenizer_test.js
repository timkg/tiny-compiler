var assert = require("assert");
var tokenizer = require("../built/tokenizer");
var { TOKEN_TYPES } = require("../built/constants");

function withInput(input, cb) {
    const tokens = tokenizer(input);
    cb(tokens);
}

describe("tokenizer", function () {

    it("tokenizes a left paren", function () {
        const input = "(";
        const tokens = tokenizer(input);
        
        assert.equal(tokens.length, 1);

        const { type } = tokens[0];
        assert.equal(type, TOKEN_TYPES.PAREN)
    })

    it("ignores whitespace around a left paren", function () {
        const input = "         (   ";
        const tokens = tokenizer(input);
        
        assert.equal(tokens.length, 1);
    })

    it("tokenizes a right paren", function () {
        const input = ")";
        const tokens = tokenizer(input);
        
        assert.equal(tokens.length, 1);

        const { type } = tokens[0];
        assert.equal(type, TOKEN_TYPES.PAREN)
    })

    it("tokenizes a single-digit number", function (done) {
        withInput("1", (tokens) => {
            assert.equal(tokens.length, 1);
            
            const { type, value } = tokens[0];
            assert.equal(type, TOKEN_TYPES.NUMBER)
            assert.equal(value, "1")

            done();
        })
    })

    it("tokenizes a multi-digit number", function (done) {
        withInput("123", (tokens) => {
            assert.equal(tokens.length, 1);
            
            const { type, value } = tokens[0];
            assert.equal(type, TOKEN_TYPES.NUMBER)
            assert.equal(value, "123")

            done();
        })
    })

    it("tokenizes a single-character string", function (done) {
        withInput('"a"', (tokens) => {
            assert.equal(tokens.length, 1);
            
            const { type, value } = tokens[0];
            assert.equal(type, TOKEN_TYPES.STRING)
            assert.equal(value, "a")

            done();
        })
    })

    it("tokenizes a multi-character string", function (done) {
        withInput('"abc"', (tokens) => {
            assert.equal(tokens.length, 1);
            
            const { type, value } = tokens[0];
            assert.equal(type, TOKEN_TYPES.STRING)
            assert.equal(value, "abc")

            done();
        })
    })

    it("tokenizes a single-character identifier / name", function (done) {
        withInput('a', (tokens) => {
            assert.equal(tokens.length, 1);
            
            const { type, value } = tokens[0];
            assert.equal(type, TOKEN_TYPES.NAME)
            assert.equal(value, "a")

            done();
        })
    })

    it("tokenizes a multi-character identifier / name", function (done) {
        withInput('add', (tokens) => {
            assert.equal(tokens.length, 1);
            
            const { type, value } = tokens[0];
            assert.equal(type, TOKEN_TYPES.NAME)
            assert.equal(value, "add")

            done();
        })
    })

    it("tokenizes a nested call expression", function (done) {
        withInput("(add 2 (subtract 4 2))", function (tokens) {
            // "("
            assert.equal(tokens[0].type, TOKEN_TYPES.PAREN);
            assert.equal(tokens[0].value, "(");

            // "add"
            assert.equal(tokens[1].type, TOKEN_TYPES.NAME);
            assert.equal(tokens[1].value, "add");

            // "2"
            assert.equal(tokens[2].type, TOKEN_TYPES.NUMBER);
            assert.equal(tokens[2].value, "2");

            // "("
            assert.equal(tokens[3].type, TOKEN_TYPES.PAREN);
            assert.equal(tokens[3].value, "(");

            // "subtract"
            assert.equal(tokens[4].type, TOKEN_TYPES.NAME);
            assert.equal(tokens[4].value, "subtract");

            // "4"
            assert.equal(tokens[5].type, TOKEN_TYPES.NUMBER);
            assert.equal(tokens[5].value, "4");

            // "2"
            assert.equal(tokens[6].type, TOKEN_TYPES.NUMBER);
            assert.equal(tokens[6].value, "2");

            // ")"
            assert.equal(tokens[7].type, TOKEN_TYPES.PAREN);
            assert.equal(tokens[7].value, ")");

            // ")"
            assert.equal(tokens[8].type, TOKEN_TYPES.PAREN);
            assert.equal(tokens[8].value, ")");

            assert.equal(tokens.length, 9);

            done();
        })
    })
    
})


