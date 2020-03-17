var assert = require("assert");
var tokenizer = require("./tokenizer");
var { TOKEN_TYPES } = require("./constants");

function withInput(input, cb) {
    const tokens = tokenizer(input);
    cb(tokens);
}

describe("tokenizer", function () {

    it("should parse a left paren", function () {
        const input = "(";
        const tokens = tokenizer(input);
        
        assert.equal(tokens.length, 1);

        const { type } = tokens[0];
        assert.equal(type, TOKEN_TYPES.PAREN)
    })

    it("should ignore whitespace around a left paren", function () {
        const input = "         (   ";
        const tokens = tokenizer(input);
        
        assert.equal(tokens.length, 1);
    })

    it("should parse a right paren", function () {
        const input = ")";
        const tokens = tokenizer(input);
        
        assert.equal(tokens.length, 1);

        const { type } = tokens[0];
        assert.equal(type, TOKEN_TYPES.PAREN)
    })

    it("should parse a single-digit number", function (done) {
        withInput("1", (tokens) => {
            assert.equal(tokens.length, 1);
            
            const { type, value } = tokens[0];
            assert.equal(type, TOKEN_TYPES.NUMBER)
            assert.equal(value, "1")

            done();
        })
    })

    it("should parse a multi-digit number", function (done) {
        withInput("123", (tokens) => {
            assert.equal(tokens.length, 1);
            
            const { type, value } = tokens[0];
            assert.equal(type, TOKEN_TYPES.NUMBER)
            assert.equal(value, "123")

            done();
        })
    })

    it("should parse a single-character string", function (done) {
        withInput('"a"', (tokens) => {
            assert.equal(tokens.length, 1);
            
            const { type, value } = tokens[0];
            assert.equal(type, TOKEN_TYPES.STRING)
            assert.equal(value, "a")

            done();
        })
    })

    it("should parse a multi-character string", function (done) {
        withInput('"abc"', (tokens) => {
            assert.equal(tokens.length, 1);
            
            const { type, value } = tokens[0];
            assert.equal(type, TOKEN_TYPES.STRING)
            assert.equal(value, "abc")

            done();
        })
    })

    it("should parse a single-character identifier / name", function (done) {
        withInput('a', (tokens) => {
            assert.equal(tokens.length, 1);
            
            const { type, value } = tokens[0];
            assert.equal(type, TOKEN_TYPES.NAME)
            assert.equal(value, "a")

            done();
        })
    })

    it("should parse a multi-character identifier / name", function (done) {
        withInput('add', (tokens) => {
            assert.equal(tokens.length, 1);
            
            const { type, value } = tokens[0];
            assert.equal(type, TOKEN_TYPES.NAME)
            assert.equal(value, "add")

            done();
        })
    })
    
})


