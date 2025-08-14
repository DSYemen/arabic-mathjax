# MathJax Arabic Extension for v4

This is an extension for MathJax (v4+), that provides basic Arabic support to MathJax.

The extension so far only supports TeX input.

## Key Features
It provides the following:

  - Flip the Equation and render it the Right-to-left (RTL) way!
  - Translate commonly used identifiers and functions.

## How to Use the Extension

### Configuration

Here's an example configuration:

```javascript
window.MathJax = {
  loader: {
    load: ['[custom]/arabic.js'],
    paths: {custom: 'https://your-path-to/dist'}
  },
  tex: {
    packages: {'[+]': ['arabic-extension']}
  }
};
```

You'll need to replace `https://your-path-to/dist` with the actual path to the `dist` directory of this extension.

### Typeset an Arabic Equation
The extension provides the following additional TeX commands to be typeset an Arabic equation:

1. **`\auto`**

   `\auto{EQUATION}` Automatically detects the language of the equation and translates it to the other language. If the equation is mostly Arabic, it will be translated to English, and vice versa.

2. **`\ar`**

   `\ar{EQUATION}` A macro to translate and RTL'ize an `EQUATION`,  where `EQUATION` can be anything from
   `x = 1` to `e^x=\lim_{n\to\infty}`.

3. **`\en`**

    `\en{EQUATION}` Translates an Arabic equation to English.

4. **`\trans`**

   `\trans{TEXT}` Translates the given text to Arabic.

5. **`\transn`**

    `\transn{NUMBER}` Translates a number to Arabic, including decimal points.

## Supported Features
 - Flip everything (almost) including:
     * Parentheses `()`, braces `{}`, and brackets `[]`
     * Things that should be flipped like: Integration `∫`, Root `√` and Sigma `Σ`

 - Doesn't flip the things that should't be flipped,
   like the following letters: Theta `Θ`, Pi `π`, and Epsilon `ε`

 - Translate the basic math functions:
     * `\sin` --> `جا`
     * `\cos` --> `جتا`
     * `\tan` --> `ظا`
     * `\cot` --> `ظتا`
     * `\sec` --> `قا`
     * `\csc` --> `قتا`
     * `\log` --> `لو`


 - Translate `\lim` into `نهــا`.

 - The following new commands:
     * **Circle radius:** `\radius` Translates to `r` and `نق`
     * **Area of circle:** (and other stuff) `\Area` Translates to `A` and `م`
     * **Arabic Zero:** `\zero` Renders the `صفر`in Arabic while printing normal `0` in English.
       The former is usually preferred by the Arabic Math textbooks.
     * **Charge Sheen Character:** `\charge` Renders the 
      [`ڛ` (Unicode U+069B)](https://www.compart.com/en/unicode/U+069B) 
       character in Arabic while printing `C` in English.

       
       This sheen character is then replaced by a more appropriate Ruqa (رقعة) character, when using
       the [modified Amiri font](https://github.com/OmarIthawi/amiri/releases).

 - Bilingual commands, which prints the first argument on English pages and the second argument on Arabic pages.
   Useful to to build bilingual equations for strings that the extension provides no explicit support to.
   **Note** The first (English) argument is always a TeX input, while the second (Arabic) can be
   TeX, Text or TeX with Symbols, depending on the command you're using.
     * **Translate a TeX input** `\transx`
     * **Translate a text input** `\transt` e.g. `\transt{\text{if}}{إذا}` for the Math piecewise equations.
     * **Translate a TeX input with Arabic symbols** `\transs`: e.g. `\transs{A_b}{أ_ب}`
     * **Translate Arabic numbers** `\transn`: e.g. `\transn{2000,000.195}`
     * **Translate Mixed Fractions** `\tmfrac`: e.g. `\tmfrac{10}{1}{2}` to denote `10.5` as a mixed fraction

 - Basic variable and function names translation:
     * `A` --> `أ`
     * `B` --> `ب`
     * `C` --> `حـ`
     * `a` --> `ا`
     * `b` --> `ب`
     * `c` --> `حـ`
     * `d` --> `د`
     * `e` --> `هـ`
     * `m` --> `م`
     * `l` --> `ل`
     * `n` --> `ن`
     * `f` --> `ق`
     * `g` --> `حـ`
     * `h` --> `هـ`
     * `k` --> `ك`
     * `r` --> `ر`
     * `t` --> `ت`
     * `x` --> `س`
     * `y` --> `ص`
     * `z` --> `ع`


 - Translation to other identifiers and operators like limits (`\lim`), sine, cosine and tan.


 - A very configurable translation utility to provide English/Arabic TeX
   commands (same command, with language-dependent output).

 - A configurable page language detection (defaults to the `lang` attribute of `<html>` tag).

 - It is generally configurable, but I haven't documented how to do it!

## Experimental Stuff
Additional extensions for Physics and some Chemistry units and symbols exists,
however, it is not tested/developed well. If you're curious, you can take a look
at the following extensions:

 - [`phys1.js`](https://github.com/OmarIthawi/arabic-mathjax/blob/master/testcases/test-extensions/phys1.js):
   Contains general physics units like Farad and speed of light. Interesting stuff, but haven't had proper
   testing and usage (yet).

 - [`phys2.js`](https://github.com/OmarIthawi/arabic-mathjax/blob/master/testcases/test-extensions/phys2.js):
   Additional advanced physics units that I don't understand as much!

 - [`hacks.js`](https://github.com/OmarIthawi/arabic-mathjax/blob/master/testcases/test-extensions/hacks.js):
   A hack to convert the English decimal mark from `.` to `٫`
   ([Arabic decimal mark, Unicode 0x066b](http://www.unicodemap.org/details/0x066B/index.html)).
   Although the Arabic decimal mark exists, I'm not sure if it is
   [common enough](https://en.wikipedia.org/wiki/Decimal_mark#Countries_using_Arabic_numerals_with_decimal_comma)
   to include it in the main installation.

# How to Contribute
Well, just issue a pull request to this repo and ping me (my GitHub username is @OmarIthawi).
Even better, grab my docker-based development environment from here so you can have a better development experience:

    $ git clone https://github.com/OmarIthawi/arabic-mathjax.git
    $ cd arabic-mathjax
    $ git clone git@github.com:mathjax/MathJax mathjax
    $ cd mathjax
    $ git checkout 2.7.1
    $ cd ..
    $ make init
    $ docker-compose up


# License
The MIT License

Copyright (c) 2015-2016 Edraak.org, Omar Al-Ithawi and contributors.

# Author

 - Omar Al-Ithawi <i@omardo.com>

# A bit of a Background
Why this plugin exists? Well, I could tell you an interesting story like I wanted to change the world,
but frankly we needed it to display Math equations for our Arabic learners at [Edraak.org](https://www.edraak.org),
and therefore I made it.

Well, it does change the world somehow, at the least in the eyes of our learners ^\_^

# Fork Info
The original repository is:
 - https://github.com/Edraak/arabic-mathjax

This fork aims to be more updated and supported.
