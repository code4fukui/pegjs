import * as t from "https://deno.land/std/testing/asserts.ts";
import parser from "./calc.pegjs.js";

Deno.test("simple", () => {
  t.assertEquals(parser.parse("1+3"), 4);
  t.assertEquals(parser.parse("1 + 1"), 2);
  t.assertEquals(parser.parse("3 * 5"), 15);
  t.assertEquals(parser.parse("1 + 3 * 5"), 16);
  t.assertEquals(parser.parse("5 / 2"), 2.5);
  t.assertEquals(parser.parse("1 + 5 / 2"), 3.5);
  t.assertEquals(parser.parse("(1+5)/2"), 3);
});
