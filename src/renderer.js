/**
 * Renderer interface
 */

function Renderer(options) {
    this.options = options || {};
    this.h = options.h;
}

/**
 * root element (根元素)
 * @param {*} h create element function (构建元素节点函数)
 * @param {*} node  current node  (当前根元素节点)
 * @param {*} index node index if node in array for key. default is 0 (如果当前节点在数组中，返回当前节点在数组中的序列，这是为了构建数组key)
 * @param {*} children node create element children (当前节点的子节点)
 */
Renderer.prototype.root = function(node, children, index) {};

Renderer.prototype.text = function(node, children, index) {};

Renderer.prototype.inlineCode = function(node, children, index) {};

Renderer.prototype.blockquote = function(node, children, index) {};

Renderer.prototype.heading = function(node, children, index) {};

Renderer.prototype.thematicBreak = function(node, children, index) {};

Renderer.prototype.list = function(node, children, index) {};

Renderer.prototype.listItem = function(node, children, index) {};

Renderer.prototype.checkbox = function(node, children, index) {};

Renderer.prototype.paragraph = function(node, children, index) {};

Renderer.prototype.table = function(node, children, index) {};

Renderer.prototype.tableRow = function(node, children, index) {};

Renderer.prototype.tableCell = function(node, children, index) {};

Renderer.prototype.strong = function(node, children, index) {};

Renderer.prototype.emphasis = function(node, children, index) {};

Renderer.prototype.break = function(node, children, index) {};

Renderer.prototype.delete = function(node, children, index) {};

Renderer.prototype.link = function(node, children, index) {};

Renderer.prototype.linkReference = function(node, children, index) {};

Renderer.prototype.definition = function(node, children, index) {};

Renderer.prototype.image = function(node, children, index) {};

Renderer.prototype.imageReference = function(node, children, index) {};

Renderer.prototype.math = function(node, children, index) {};

Renderer.prototype.inlineMath = function(node, children, index) {};

Renderer.prototype.html = function(node, children, index) {};

Renderer.prototype.code = function(node, children, index) {};

module.exports = Renderer;
