import { readAll } from "@std/io/read-all";
let code = new TextDecoder().decode(await readAll(Deno.stdin));

const or = (fns: readonly (() => string)[]) => {
  const backup = code;
  for (const fn of fns) {
    try {
      return fn();
    } catch {
      code = backup;
      continue;
    }
  }
  throw new Error("or failed");
};
const many = (fn: () => string) => {
  const out: string[] = [];
  while (code.length) {
    const backup = code;
    try {
      out.push(fn());
    } catch (_) {
      code = backup;
      break;
    }
  }
  return out;
};
const optional = (chr: string) => t(new RegExp(`^\\${chr}?`)) || chr;
const t = (re: RegExp) => {
  code = code.slice(code.search(/[^ ]/));
  const match = code.match(re)![0]; // throws if no match
  code = code.slice(match.length);
  return match;
};

const num = () => `new $N(${Number(t(/^[+-]?(?:\d*\.\d+|\d+)/))})`;
const str = () => `new $S(${t(/^"(?:\\.|[^"])*"/)})`;
const chr = () => `new $S(${JSON.stringify(t(/^'./)[1])})`;
const name = () => t(/^[A-Z]/);
const arr = () =>
  t(/^\[/) + many(() => expr() + optional(",")).join("") + optional("]");
const func = () =>
  `new $F((D,E,F)=>${t(/^\{/)}
    return (${many(expr).join(",\n")})
  ${optional("}")})`;
const paren = () => t(/^\(/) + expr() + optional(")");
const nilad = () => or([num, str, chr, name, paren, arr, func]);
const triad = () => `.${t(/^[a-z](\u0324|\.\.)/)[0]}(${arg()},${arg()})`;
const dyad = () => `.${t(/^[a-z](\u0323|\.)/)[0]}(${arg()})`;
const monad = () => `.${t(/^[a-z]/)}()`;
const infix = () => t(/^[+\-*]|&&|\|\|/) + arg();
const cond = () => t(/^\?/) + arg() + t(/^:/);
const chain = () => or([triad, dyad, monad, infix, cond]);
function arg(): string {
  return or([nilad, () => "U" + chain(), () => "U"]);
}
function expr() {
  return arg() + many(chain).join("");
}
