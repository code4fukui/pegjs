import { peg } from "./lib/peg.js";

const fn = Deno.args[0];
const input = await Deno.readTextFile(fn);
const options = {
  //inputFile: "-",
  //outputFile: "-",
  format: "es",
  output: "source",
};
const src = peg.generate(input, options);
//console.log(src);
await Deno.writeTextFile(fn + ".js", src);
