const unified = require('unified');
const parse = require('remark-parse');
const render = require('../../src/index');
const morphdom = require('./morphdom');

function createElement(type, props, children) {
    let dom = document.createElement(type);
    if(props.className) {
        dom.className = props.className;
    }
    if(props.hasOwnProperty('id')) {
        dom.id = props.id;
    }
    dom.appendChild( createElements(children) );
    return dom;
}

function createElements(children) {
    const doms = document.createDocumentFragment();
    children && children.length > 0 && children.forEach(function (dom) {
        dom && doms.appendChild(dom);
    });
    return doms;
}


const Renderer = require('./renderer');
let processor = unified()
    .use(parse, {})
    .use(render, {
        Renderer: Renderer,
        h: createElement
    });

const file = processor.processSync(require('../md/maxiang.md'));
const markdownContainer = file.contents;

const previewContainer = document.getElementById('app');

morphdom(previewContainer, markdownContainer);

