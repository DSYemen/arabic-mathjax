import {
    trans,
    reverseTrans
} from './util.js';

// The post-filter for Arabic processing
export function arabicPostFilter(math, doc, options) {
    const isRTL = shouldBeRTL(math, doc, options);
    const isLTR = shouldBeLTR(math, doc, options);

    //
    //  A visitor to walk the tree and translate the text in the nodes
    //
    const visitor = new(math.mmlVisitor)();
    visitor.visitTree(math.root, (node) => {
        if (node.isToken) {
            const text = node.getText();
            let newText = text;
            if (isRTL) {
                newText = trans(null, text);
            } else if (isLTR) {
                newText = reverseTrans(text);
            }
            if (text !== newText) {
                node.setText(newText);
            }
        }
    });
    //
    //  If the equation should be RTL, set the direction
    //
    if (isRTL) {
        math.root.attributes.set('dir', 'rtl');
    }
    return math;
}

//
//  Function to decide if the expression should be RTL
//
function shouldBeRTL(math, doc, options) {
    if (math.inputData.tags.has('arabicRTL')) {
        return true;
    }
    if (math.inputData.tags.has('arabicLTR')) {
        return false;
    }
    if (options.arabic.autoLTR) {
        return options.arabic.isArabicPage();
    }
    return false;
}

//
//  Function to decide if the expression should be LTR (i.e., translated to English)
//
function shouldBeLTR(math, doc, options) {
    return math.inputData.tags.has('arabicLTR');
}
