var extend = require('extend');

function extendProps(node, props) {
    if(!node.properties){ node.properties = {}; }
    extend(node.properties, props);
}

function Parser(options) {
    this.options = options;
    this.h = options.h;
}

Parser.prototype.parseNodes = function(nodes) {
    if(!nodes || nodes.length === 0) return [];
    var vnodes = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        extendProps(node, {key: i});
        var tempNode = this.parseNode(node);
        tempNode && vnodes.push(tempNode);
    }
    return vnodes;
};

Parser.prototype.parseNode = function(node) {
    if(!node) return null;
    var children = this.parseNodes(node.children);
    var h = this.h;
    return this.renderer[node.type].apply(null, [h, node, children]);
};

Parser.prototype.parse = function(root) {
    try {
        extendProps(root, {
            key: 0,
            className: this.options.rootClassName || 'markdown-body'
        });
        this.options.rootTagName && (root.tagName = this.options.rootTagName);
        return this.parseNode(root);
    }
    catch (e) {
        console.error(e);
        return this.h?this.h('div', {}, 'error'):null;
    }
};

module.exports = Parser;