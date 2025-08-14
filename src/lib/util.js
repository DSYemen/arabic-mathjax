export const identifiersMap = {
    // Variable names
    'a': 'أ',
    'b': 'ب',
    'c': 'جـ',
    'x': 'س',
    'y': 'ص',
    'z': 'ع',
    'n': 'ن',

    // Function names
    'f': 'ق',
    'g': 'جـ',
    'h': 'هـ',

    // Mixed use
    'k': 'ك',
    'r': 'ر',
    't': 'ت',
    'd': 'د',
    'e': 'هـ',
    'm': 'م',
    'l': 'ل',

    // Math functions
    'sin': 'جا',
    'cos': 'جتا',
    'tan': 'ظا',
    'cot': 'ظتا',
    'sec': 'قا',
    'csc': 'قتا',
    'log': 'لو'
};

export const numbersMap = {
    '0': '٠',
    '1': '١',
    '2': '٢',
    '3': '٣',
    '4': '٤',
    '5': '٥',
    '6': '٦',
    '7': '٧',
    '8': '٨',
    '9': '٩'
};

export const operatorsMap = {
    ',': '،',
    ';': '؛',
    'lim': 'نهــا'
};

const arabicDecimalSplitter = '٫';
const arabicLanguageRegExp = /([\u0600-\u06FF]+)/g;

export function trans(parser, text) {
    let result = text.replace(/\d/g, (d) => numbersMap[d] || d);
    result = result.replace(/[a-zA-Z]+/g, (i) => identifiersMap[i] || i);
    result = result.replace(/[,;]/g, (p) => operatorsMap[p] || p);
    return result;
}

export function transn(parser, n) {
    const num_str = n.toString();
    let result = '';
    for (let i = 0; i < num_str.length; i++) {
        const char = num_str[i];
        if (char === '.') {
            result += arabicDecimalSplitter;
        } else {
            result += numbersMap[char] || char;
        }
    }
    return result;
}

export function isArabic(text) {
    return arabicLanguageRegExp.test(text);
}

function reverseMap(map) {
    const reversed = {};
    for (const key in map) {
        reversed[map[key]] = key;
    }
    return reversed;
}

export const reverseIdentifiersMap = reverseMap(identifiersMap);
export const reverseNumbersMap = reverseMap(numbersMap);
export const reverseOperatorsMap = reverseMap(operatorsMap);

export function reverseTrans(text) {
    let result = text.replace(/[\u0660-\u0669]/g, (d) => reverseNumbersMap[d] || d);
    result = result.replace(/[\u0621-\u064A]+/g, (i) => reverseIdentifiersMap[i] || i);
    result = result.replace(/[،؛]/g, (p) => reverseOperatorsMap[p] || p);
    return result;
}

const arabicCharRegex = /[\u0600-\u06FF]/;
const latinCharRegex = /[a-zA-Z]/;

export function detectLanguage(text) {
    const arabicCount = (text.match(new RegExp(arabicCharRegex.source, 'g')) || []).length;
    const latinCount = (text.match(new RegExp(latinCharRegex.source, 'g')) || []).length;

    if (arabicCount > latinCount) {
        return 'ar';
    }
    return 'en';
}
