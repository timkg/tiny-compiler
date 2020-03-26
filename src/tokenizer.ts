import { TOKEN_TYPES }  from "./constants";

interface LeftParen {
    type: "Paren";
    value: "("
}

interface RightParen {
    type: "Paren";
    value: ")"
}

interface Number {
    type: "Number";
    value: number;
}

interface String {
    type: "String";
    value: string;
}

export interface Name {
    type: "Name";
    value: string;
}

function tokenizer (input: string): Array< LeftParen | RightParen | String | Name | Number > {
    let tokens = [];
    let current = 0;

    while(current < input.length) {
        let char = input[current];

        if (char === "(") {
            tokens.push({
                type: TOKEN_TYPES.PAREN,
                value: "("
            });

            current++;
            continue;
        }

        if (char === ")") {
            tokens.push({
                type: TOKEN_TYPES.PAREN,
                value: ")"
            });

            current++;
            continue;
        }

        let WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        let NUMBERS = /[0-9]/;
        if (NUMBERS.test(char)) {
            let value = "";

            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }

            tokens.push({
                type: TOKEN_TYPES.NUMBER,
                value: value
            });

            continue;
        }

        if (char === '"') {
            let value = "";

            // skip opening quote
            char = input[++current];

            while (char !== '"') {
                value += char;
                char = input[++current];
            }

            // skip closing quote
            char = input[++current];

            tokens.push({
                type: TOKEN_TYPES.STRING,
                value
            })

            continue;
        }

        let LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
            let value = '';

            // LETTERS.test(undefined) returns true, so make sure
            // we still have characters left. Otherwise this will 
            // result in an infinite loop.
            while (LETTERS.test(char) && current < input.length) {
                value += char;
                char = input[++current];
            }

            tokens.push({ type: TOKEN_TYPES.NAME, value });

            continue;
        }

        throw new TypeError('I dont know what this character is: ' + char);
    }


    return tokens;
}

module.exports = tokenizer;
