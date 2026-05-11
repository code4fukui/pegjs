# PEG.js

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

PEG.jsは、JavaScript用のシンプルなパーサージェネレータであり、優れたエラーレポートを備えた高速なパーサーを生成します。複雑なデータやコンピュータ言語を処理し、トランスフォーマ、インタプリタ、コンパイラ、その他のツールを簡単に構築できます。

> [!NOTE]
> PEG.jsは現在も鋭意開発中です。バージョン1.0になるまで互換性の保証はありません。

## 機能

*   **シンプルで表現力豊かな構文:** すっきりと読みやすい文法で複雑なパーサーを記述できます。
*   **優れたエラーレポート:** 人間が読めるエラーメッセージをすぐに取得できます。
*   **高いパフォーマンス:** パース時間を最小限に抑える高速なパーサーを生成します。
*   **強力な形式論:** [Parsing Expression Grammar (PEG)](http://en.wikipedia.org/wiki/Parsing_expression_grammar) に基づいており、字句解析と構文解析を統合しています。

## オンラインで試す

ブラウザ上で直接PEG.jsを試し、パーサーを生成することができます。

**[オンライン版を試す](https://pegjs.org/online)**

## インストール

Node.js `>= 8` が必要です。

```sh
npm install pegjs
```

## 使い方

### コマンドライン

文法ファイルからパーサーを生成します。出力はJavaScriptモジュールになります。

```sh
# grammar.pegjsからparser.jsを生成
npx pegjs grammar.pegjs -o parser.js
```

### Node.js (CommonJS)

```javascript
const peg = require("pegjs");

// 文法からパーサーを作成
const parser = peg.generate('start = "a" / "b"');

// 入力の解析
const result = parser.parse("a"); // "a"を返します
console.log(result);
```

### ES Module / Deno / ブラウザ

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

const result = parser.parse("2*(3+4)"); // 14を返します
console.log(result);
```

## ドキュメント

詳細については、公式ドキュメントを参照してください:

*   **[Getting Started](https://github.com/pegjs/pegjs/blob/master/docs/guides/getting-started.md)**
*   **[Grammar Syntax and Semantics](https://github.com/pegjs/pegjs/tree/master/docs/grammar)**
*   **[JavaScript API Reference](https://github.com/pegjs/pegjs/blob/master/docs/api.md)**
