/**
 * Renderer interface
 */
const extend = require('extend');

function Renderer(options) {
    this.options = options || {};
}

Renderer.prototype.root = function(h, node, children) {
    return h('div', node.props, children);
};

Renderer.prototype.text = function(h, node, children) {
    return document.createTextNode(node.value);
};

Renderer.prototype.blockquote = function(h, node, children) {
    return h('blockquote', node.props, children);
};

Renderer.prototype.heading = function(h, node, children) {
    return h('h'+node.depth, node.props, children);
};

Renderer.prototype.thematicBreak = function(h, node, children) {
    return h('hr', node.props);
};

Renderer.prototype.list = function(h, node, children) {
    return h(node.ordered?'ol':'ul', node.props, children);
};

Renderer.prototype.listItem = function(h, node, children) {
    return h('li', node.props, children);
};

Renderer.prototype.checkbox = function(h, node, children) {};

Renderer.prototype.paragraph = function(h, node, children) {
    return h('p', node.props, children);
};

Renderer.prototype.table = function(h, node, children) {

};

Renderer.prototype.tableRow = function(h, node, children) {};

Renderer.prototype.tableCell = function(h, node, children) {};

Renderer.prototype.strong = function(h, node, children) {
    return h('strong', node.props, children);
};

Renderer.prototype.emphasis = function(h, node, children) {
    return h('em', node.props, children);
};

Renderer.prototype.break = function(h, node, children) {
    return h('br', node.props);
};

Renderer.prototype.delete = function(h, node, children) {
    return h('del', node.props);
};

Renderer.prototype.link = function(h, node, children) {
    return h('a', extend({
        href: node.url,
        title: node.title
    },node.props), children);
};

Renderer.prototype.linkReference = function(h, node, children) {};

Renderer.prototype.definition = function(h, node, children) {};

Renderer.prototype.image = function(h, node, children) {};

Renderer.prototype.imageReference = function(h, node, children) {};

Renderer.prototype.inlineCode = function(h, node, children) {};

Renderer.prototype.math = function(h, node, children) {};

Renderer.prototype.inlineMath = function(h, node, children) {};

Renderer.prototype.html = function(h, node, children) {};

Renderer.prototype.code = function(h, node, children) {


    let pre = h('pre', node.props);


    let code = h('code', {
        className: node.lang?'language-'+node.lang:null
    });
    code.innerText = node.value;

    pre.appendChild(code);
    return pre;
};

module.exports = Renderer;
