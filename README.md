# PEG.js

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

![GitHub Actions](https://github.com/pegjs/pegjs/workflows/Github%20Actions/badge.svg)

[
![Codecov](https://codecov.io/gh/pegjs/pegjs/branch/master/graph/badge.svg)
](https://codecov.io/gh/pegjs/pegjs)
[
![CodeFactor](https://www.codefactor.io/repository/github/pegjs/pegjs/badge)
](https://www.codefactor.io/repository/github/pegjs/pegjs)
[
![license](https://img.shields.io/badge/license-mit-blue.svg)
](https://opensource.org/licenses/MIT)

PEG.js is a simple parser generator for JavaScript that produces fast parsers with excellent error reporting. You can use it to process complex data or computer languages and build transformers, interpreters, compilers, and other tools easily.

> [!NOTE]
> PEG.js is still very much a work in progress. There are no compatibility guarantees until version 1.0.

## Features

*   **Simple and Expressive Syntax:** Write complex parsers with a clean, readable grammar.
*   **Excellent Error Reporting:** Get human-readable error messages out of the box.
*   **Great Performance:** Generates fast parsers that minimize parsing time.
*   **Powerful Formalism:** Based on [Parsing Expression Grammar (PEG)](http://en.wikipedia.org/wiki/Parsing_expression_grammar), it integrates both lexical and syntactical analysis.

## Try It Online

You can experiment with PEG.js and generate a parser directly in your browser.

**[Try the Online Version](https://pegjs.org/online)**

## Installation

Requires Node.js `>= 8`.

```sh
npm install pegjs
```

## Usage

### Command Line

Generate a parser from a grammar file. The output is a JavaScript module.

```sh
# Generates parser.js from grammar.pegjs
npx pegjs grammar.pegjs -o parser.js
```

### Node.js (CommonJS)

```javascript
const peg = require("pegjs");

// Create a parser from a grammar
const parser = peg.generate('start = "a" / "b"');

// Parse input
const result = parser.parse("a"); // returns "a"
console.log(result);
```

### ES Module / Deno / Browser

```javascript
import { peg } from "https://code4fukui.github.io/pegjs/packages/pegjs/lib/peg.js";

const grammar = `
  start = additive
  additive = left:multiplicative "+" right:additive { return left + right; } / multiplicative
  multiplicative = left:primary "*" right:multiplicative { return left * right; } / primary
  primary = integer / "(" additive:additive ")" { return additive; }
  integer "integer" = digits:[0-9]+ { return parseInt(digits.join(""), 10); }
`;

const parser = peg.generate(grammar);

const result = parser.parse("2*(3+4)"); // returns 14
console.log(result);
```

## Documentation

For more detailed information, see the official documentation:

*   **[Getting Started](https://github.com/pegjs/pegjs/blob/master/docs/guides/getting-started.md)**
*   **[Grammar Syntax and Semantics](https://github.com/pegjs/pegjs/tree/master/docs/grammar)**
*   **[JavaScript API Reference