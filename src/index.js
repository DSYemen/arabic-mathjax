import {
    Configuration
} from 'mathjax-full/js/input/tex/Configuration.js';
import {
    CommandMap
} from 'mathjax-full/js/input/tex/TokenMap.js';
import {
    trans,
    transn,
    reverseTrans,
    detectLanguage
} from './lib/util.js';

const ArabicMethods = {};

// \auto{...}
ArabicMethods.auto = (parser, name) => {
    const arg = parser.GetArgument(name);
    const lang = detectLanguage(arg);
    const translated = lang === 'ar' ? reverseTrans(arg) : trans(parser, arg);
    parser.string = translated + parser.string.slice(parser.i);
    parser.i = 0;
};

// \ar{...}
ArabicMethods.ar = (parser, name) => {
    const arg = parser.GetArgument(name);
    parser.string = trans(parser, arg) + parser.string.slice(parser.i);
    parser.i = 0;
};

// \en{...}
ArabicMethods.en = (parser, name) => {
    const arg = parser.GetArgument(name);
    parser.string = reverseTrans(arg) + parser.string.slice(parser.i);
    parser.i = 0;
};

// \trans{...}
ArabicMethods.trans = (parser, name) => {
    const text = parser.GetArgument(name);
    parser.Push(parser.create('token', 'mtext', {}, trans(parser, text)));
};

// \transn{...}
ArabicMethods.transn = (parser, name) => {
    const n = parser.GetArgument(name);
    parser.Push(parser.create('token', 'mn', {}, transn(parser, n)));
};

// Translated macros
const translatedMacros = {
    'zero': ['zero', '0', 'صفر'],
    'radius': ['radius', 'r', 'نق'],
    'Area': ['Area', 'A', 'م'],
    'charge': ['charge', 'C', '\\text{ڛ}']
};

function TeX(english, arabic) {
    return (parser, name) => {
        const isArabic = parser.options.arabic.isArabicPage();
        const tex = isArabic ? arabic : english;
        parser.Push(parser.create('token', 'mtext', {}, tex));
    };
}

for (const key in translatedMacros) {
    const [macro, english, arabic] = translatedMacros[key];
    ArabicMethods[macro] = TeX(english, arabic);
}

new CommandMap('arabic-macros', {
    auto: 'auto',
    ar: 'ar',
    en: 'en',
    trans: 'trans',
    transn: 'transn',
    zero: 'zero',
    radius: 'radius',
    Area: 'Area',
    charge: 'charge'
}, ArabicMethods);

export const ArabicConfiguration = Configuration.create('arabic-extension', {
    handler: {
        macro: ['arabic-macros']
    },
    options: {
        arabic: {
            isArabicPage: () => {
                if (typeof document !== 'undefined') {
                    return document.documentElement.lang === 'ar';
                }
                return false;
            }
        }
    }
});
