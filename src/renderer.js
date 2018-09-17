/**
 * Renderer interface
 */

function Renderer(options) {
    this.options = options || {};
    this._h = options.h;
}

Renderer.prototype.h = function(h) {
    if(h) {
        this._h = h;
    }
    return this._h;
};

/**
 * root element (根元素)
 * @param {*} h create element function (构建元素节点函数)
 * @param {*} node  current node  (当前根元素节点)
 * @param {*} index node index if node in array for key. default is 0 (如果当前节点在数组中，返回当前节点在数组中的序列，这是为了构建数组key)
 * @param {*} children node create element children (当前节点的子节点)
 */
Renderer.prototype.root = function(h, node, index, children) {};

Renderer.prototype.text = function(h, node, index) {};

Renderer.prototype.inlineCode = function(h, node, index, children) {};

Renderer.prototype.code = function(h, node, index, children) {};

Renderer.prototype.blockquote = function(h, node, index, children) {};

Renderer.prototype.heading = function(h, node, index, children) {};

Renderer.prototype.thematicBreak = function(h, node, index, children) {};

Renderer.prototype.list = function(h, node, index, children) {};

Renderer.prototype.listItem = function(h, node, index, children) {};

Renderer.prototype.checkbox = function(h, node, index, children) {};

Renderer.prototype.paragraph = function(h, node, index, children) {};

Renderer.prototype.table = function(h, node, index, children) {};

Renderer.prototype.tableRow = function(h, node, index, children) {};

Renderer.prototype.tableCell = function(h, node, index, children) {};

Renderer.prototype.strong = function(h, node, index, children) {};

Renderer.prototype.emphasis = function(h, node, index, children) {};

Renderer.prototype.break = function(h, node, index, children) {};

Renderer.prototype.delete = function(h, node, index, children) {};

Renderer.prototype.link = function(h, node, index, children) {};

Renderer.prototype.linkReference = function(h, node, index, children) {};

Renderer.prototype.definition = function(h, node, index, children) {};

Renderer.prototype.image = function(h, node, index, children) {};

Renderer.prototype.imageReference = function(h, node, index, children) {};

Renderer.prototype.math = function(h, node, index, children) {};

Renderer.prototype.inlineMath = function(h, node, index, children) {};

Renderer.prototype.html = function(h, node, index, children) {};

module.exports = Renderer;
