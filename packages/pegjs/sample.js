import { peg } from "./lib/peg.js";

const input = `
start
    = any

any
    = multiplicative
    / divisive
    / additive
    / subtractive
    / primary

primary
    = float
    / integer
    / "(" any:any ")" { return any; }
    / "" { return 0; }

additive
    = left:primary "+" right:any { return left + right; }
 
multiplicative
    = left:primary "*" right:any { return left * right; }
 
subtractive
    = left:primary "-" right:any { return left - right; }
 
divisive
    = left:primary "/" right:any { return left / right; }
 
float "float"
    = _ left:[0-9]+ "." right:[0-9]+ _ { return parseFloat(left.join("") + "." + right.join("")); }
 
integer "integer"
    = _ digits:[0-9]+ _ { return parseInt(digits.join(""), 10); }

_ "whitespace"
    = [\s ]*
`;
const parser = peg.generate(input);
//console.log(src);
//await Deno.writeTextFile(fn + ".js", src);
const res = parser.parse("1+1");
console.log(res);
