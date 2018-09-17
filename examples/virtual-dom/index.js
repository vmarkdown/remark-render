const Renderer = require('../../src/renderers/virtual-dom/renderer');
const { h, create } = virtualDom;
const renderer = new Renderer({
    h: h,
    rootClassName: 'markdown-body'
});

const vremarkPluginKatex = require('vremark-plugin-katex');

const processor = vremark({
    renderer: renderer
}).use(vremarkPluginKatex);

function parse(md) {
    const file = processor.processSync(md);
    const vdom = file.contents;
    return vdom;
}

const mdText = require('../md/cmd.txt');
const rootNode = create(parse(mdText));

document.getElementById('preview').appendChild(rootNode);