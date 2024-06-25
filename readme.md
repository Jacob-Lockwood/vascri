# Vascri

(v0.0.-1)

**Note**: Vascri is in a very early stage of development. No functions have been
implemented yet, only a rudimentary parser, and that too is still missing
certain features. This notice will be removed when it hits v0.1.0.

Vascri is a code-golf language designed to be a spiritual successor to
ETHProduction's language [Japt]. Japt is a shortened version of JavaScript, and
Vascri is a shortened version of Japt. (Admittedly, the difference between the
length of JavaScript and Japt programs is far greater than the length difference
between Japt and Vascri programs, but that's just how this goes.)

Japt's name comes from taking the first and last two characters of JavaScript:

<!-- deno-fmt-ignore -->
<ins>**Ja**</ins>vascri<ins>**pt**</ins>

Therefore, Vascri takes the rest:

<!-- deno-fmt-ignore -->
Ja<ins>**vascri**</ins>pt

## Motivation

Japt was a very efficient code-golf language for its time, but in recent years
it has struggled to keep up with newer languages such as [Vyxal]. On
[Code Golf Stack Exchange's language leaderboard](https://codegolf.meta.stackexchange.com/a/8891/108687),
we can see that while Japt was at 4th place for shortest language in 2016, by
2024 it has fallen down to 16th place.

If we look at Japt code side-by-side with Vyxal, we can see some glaring issues
that make Japt code longer.

Here's an example of two programs to do the same task using the same method,
written in Japt and Vyxal respectively:

```
Japt:   @ãX mx ¯J eUtX}a
Vyxal:  ?lṠṪ?nȯ⁼)ṅ
Vascri: {w.}
```

[Japt]: https://github.com/ETHproductions/japt
[Vyxal]: https://github.com/Vyxal/Vyxal
