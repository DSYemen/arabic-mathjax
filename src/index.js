import { Configuration } from 'mathjax-full/js/input/tex/Configuration.js';
import { CommandMap } from 'mathjax-full/js/input/tex/TokenMap.js';
import { trans, reverseTrans, detectLanguage, transn, identifiersMap } from './util.js';
import TexParser from 'mathjax-full/js/input/tex/TexParser.js';
import { MmlNode } from 'mathjax-full/js/core/MmlTree/MmlNode.js';

const ArabicMethods = {};

function createMmlNode(parser, text, dir = '') {
    const mml = parser.create('token', 'mtext', {}, text);
    if (dir) {
        mml.setAttribute('dir', dir);
    }
    return mml;
}

function parseAndTranslate(parser, arg, translator, dir) {
    const translatedText = translator(arg);
    const newParser = new TexParser(translatedText, parser.stack.env, parser.configuration);
    newParser.parse();
    const mml = newParser.mml();

    if (mml) {
        mml.attributes.set('dir', dir);
    }
    
    parser.Push(mml);
}

// \ar{...} -> Translates content to Arabic and sets RTL direction
ArabicMethods.ar = (parser, name) => {
    const arg = parser.GetArgument(name);
    parseAndTranslate(parser, arg, trans, 'rtl');
};

// \en{...} -> Translates content to English and sets LTR direction
ArabicMethods.en = (parser, name) => {
    const arg = parser.GetArgument(name);
    parseAndTranslate(parser, arg, reverseTrans, 'ltr');
};

// \auto{...} -> Auto-detects language and translates to the other
ArabicMethods.auto = (parser, name) => {
    const arg = parser.GetArgument(name);
    const lang = detectLanguage(arg);
    if (lang === 'ar') {
        parseAndTranslate(parser, arg, reverseTrans, 'ltr');
    } else {
        parseAndTranslate(parser, arg, trans, 'rtl');
    }
};

// \trans{...} -> Simple text translation
ArabicMethods.trans = (parser, name) => {
    const text = parser.GetArgument(name);
    parser.Push(createMmlNode(parser, trans(text)));
};

// \transn{...} -> Simple number translation
ArabicMethods.transn = (parser, name) => {
    const n = parser.GetArgument(name);
    parser.Push(createMmlNode(parser, transn(n)));
};


const arabicMap = new CommandMap('arabic-macros', {
    ar: 'ar',
    en: 'en',
    auto: 'auto',
    trans: 'trans',
    transn: 'transn',
    // Add macros from old version
    zero: ['Macro', identifiersMap.zero],
    radius: ['Macro', identifiersMap.radius],
    Area: ['Macro', identifiersMap.Area],
    charge: ['Macro', identifiersMap.charge]
}, ArabicMethods);

export const ArabicConfiguration = Configuration.create('arabic-extension', {
    handler: {
        macro: ['arabic-macros']
    }
});

//
//  Make the component available to MathJax
//
if (typeof MathJax !== 'undefined' && MathJax.loader) {
  MathJax.loader.ready(() => {
    MathJax.loader.makeComponent(
      '[custom]/arabic',
      {
        ready: (loader) => {
          loader.mathjax.config.tex['arabic-extension'] = ArabicConfiguration;
          loader.load('input/tex-base');
        }
      }
    );
  });
}
