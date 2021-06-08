import $ = require('jquery');

export function getElementByXpath(path: string) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

export function generateQuerySelector(el: HTMLElement) {
    if (el.tagName.toLowerCase() == "html")
        return "html";
    var str = el.tagName.toLowerCase();
    str += (el.id != "") ? "#" + el.id : "";
    if (el.className) {
        var classes = el.className.split(/\s/);
        for (var i = 0; i < classes.length; i++) {
            str += "." + classes[i]
        }
    }
    return generateQuerySelector((el as Node).parentNode as HTMLElement) + " > " + str;
}

export function getXpathFromElement(node: Node): string {
    const idx = (sib, name) => sib
        ? idx(sib.previousElementSibling, name||sib.localName) + (sib.localName == name)
        : 1;
    const segs = elm => !elm || elm.nodeType !== 1 
        ? ['']
        : elm.id && document.getElementById(elm.id) === elm
            ? [`id("${elm.id}")`]
            : [...segs(elm.parentNode), `${elm.localName.toLowerCase()}[${idx(elm, '')}]`];
    return segs(node).join('/');
}

export function addScript(cdn: string) {
    $('script', {
        src: cdn
    }).appendTo('head');
}