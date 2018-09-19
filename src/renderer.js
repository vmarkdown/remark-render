/**
 * Renderer interface
 */

function Renderer(options) {
    this.options = options || {};
}

/**
 * root element (根元素)
 * @param {*} h create element function (构建元素节点函数)
 * @param {*} node  current node  (当前根元素节点)
 * node.key is node index if node in array for key. default is 0 (如果当前节点在数组中，返回当前节点在数组中的序列，这是为了构建数组key)
 * @param {*} children node create element children (当前节点的子节点)
 */
Renderer.prototype.root = function(h, node, children) {};

Renderer.prototype.text = function(h, node, children) {};

Renderer.prototype.inlineCode = function(h, node, children) {};

Renderer.prototype.blockquote = function(h, node, children) {};

Renderer.prototype.heading = function(h, node, children) {};

Renderer.prototype.thematicBreak = function(h, node, children) {};

Renderer.prototype.list = function(h, node, children) {};

Renderer.prototype.listItem = function(h, node, children) {};

Renderer.prototype.checkbox = function(h, node, children) {};

Renderer.prototype.paragraph = function(h, node, children) {};

Renderer.prototype.table = function(h, node, children) {};

Renderer.prototype.tableRow = function(h, node, children) {};

Renderer.prototype.tableCell = function(h, node, children) {};

Renderer.prototype.strong = function(h, node, children) {};

Renderer.prototype.emphasis = function(h, node, children) {};

Renderer.prototype.break = function(h, node, children) {};

Renderer.prototype.delete = function(h, node, children) {};

Renderer.prototype.link = function(h, node, children) {};

Renderer.prototype.linkReference = function(h, node, children) {};

Renderer.prototype.definition = function(h, node, children) {};

Renderer.prototype.image = function(h, node, children) {};

Renderer.prototype.imageReference = function(h, node, children) {};

Renderer.prototype.math = function(h, node, children) {};

Renderer.prototype.inlineMath = function(h, node, children) {};

Renderer.prototype.html = function(h, node, children) {};

Renderer.prototype.code = function(h, node, children) {};

module.exports = Renderer;
