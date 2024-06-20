import { readAll } from "@std/io/read-all";
let code = new TextDecoder().decode(await readAll(Deno.stdin));

const or = (fns: readonly (() => string)[]) => {
  for (const fn of fns) {
    try {
      return fn();
    } catch {
      continue;
    }
  }
  throw new Error("or failed");
};
function* many(fn: () => string) {
  while (code.length) {
    try {
      yield fn();
    } catch (_) {
      break;
    }
  }
}
const optional = (chr: string) => t(new RegExp(`^\\${chr}?`)) || chr;
const t = (re: RegExp) => {
  code = code.slice(code.search(/[^ ]/));
  const match = code.match(re)![0]; // throws if no match
  code = code.slice(match.length);
  return match;
};
const num = () => `new $N(${Number(t(/^[+-]?(?:\d*\.\d+|\d+)/))})`;
const str = () => `new $S(${t(/^"(?:\\.|[^"])*"/)})`;
const chr = () => `new $S('${t(/^'./)[1]}')`;
const nme = () => t(/^[A-Z]/);
const arr = () =>
  t(/^\[/) + [...many(() => expr() + optional(","))].join("") + optional("]");
const nilad = () => or([arr, num, str, chr, nme]);
const triad = () => `.${t(/^[a-z][\u0324:]/)[0]}(${arg()},${arg()})`;
const dyad = () => `.${t(/^[a-z][\u0323\.]/)[0]}(${arg()})`;
const monad = () => `.${t(/^[a-z]/)}()`;
const infix = () => t(/^[+\-*/]/) + arg();
const cond = () => t(/^\?/) + arg() + t(/^\!/);
const chain = () => or([triad, dyad, monad, infix, cond]);
function arg(): string {
  const z = () => or([nilad, () => "X" + chain()]);
  const p = () => t(/^\(/) + expr() + optional(")");
  return or([p, z]);
}
function expr() {
  return arg() + [...many(chain)].join("");
}
