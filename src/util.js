export const identifiersMap = {
    // Variable names
    'a': 'أ', 'b': 'ب', 'c': 'جـ', 'x': 'س', 'y': 'ص', 'z': 'ع', 'n': 'ن',
    'f': 'ق', 'g': 'جـ', 'h': 'هـ', 'k': 'ك', 'r': 'ر', 't': 'ت', 'd': 'د',
    'e': 'هـ', 'm': 'م', 'l': 'ل',

    // Math functions
    'sin': 'جا', 'cos': 'جتا', 'tan': 'ظا', 'cot': 'ظتا', 'sec': 'قا',
    'csc': 'قتا', 'log': 'لو', 'lim': 'نهــا',

    // Custom commands from old version
    'Area': 'المساحة', 'radius': 'نق', 'charge': 'الشحنة', 'zero': '٠'
};

export const numbersMap = {
    '0': '٠', '1': '١', '2': '٢', '3': '٣', '4': '٤',
    '5': '٥', '6': '٦', '7': '٧', '8': '٨', '9': '٩'
};

export const operatorsMap = {
    ',': '،', ';': '؛'
};

const arabicDecimalSplitter = '٫';
// Regex to tokenize the input string into commands, identifiers, numbers, or single characters
const tokenRegex = /\\([a-zA-Z]+)|([a-zA-Z]+)|(\d+\.?\d*)|(.)/g;

export function trans(text) {
    if (typeof text !== 'string') return text;

    return text.replace(tokenRegex, (match, command, identifier, number, symbol) => {
        if (command) {
            // Translate command if it's in the map, otherwise keep it as is (e.g., \frac)
            if (identifiersMap[command]) {
                // Wrap in \text so MathJax treats it as text
                return `\\text{${identifiersMap[command]}}`;
            }
            return '\\' + command;
        }
        if (identifier) {
            return identifiersMap[identifier] || identifier;
        }
        if (number) {
            return transn(number);
        }
        if (symbol) {
            return operatorsMap[symbol] || symbol;
        }
        return match;
    });
}

export function transn(n) {
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
    if (typeof text !== 'string') return text;
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
    return arabicCount > latinCount ? 'ar' : 'en';
}
