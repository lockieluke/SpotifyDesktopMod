import $ = require('jquery');

export function getElementByXpath(path: string) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

export function addScript(cdn: string) {
    $('script', {
        src: cdn
    }).appendTo('head');
}