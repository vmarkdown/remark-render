function Parser(options) {
    this.options = options;
    this.renderer = options.renderer;
}

Parser.prototype.parseNodes = function(nodes) {
    if(!nodes || nodes.length === 0) return [];

    var vnodes = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        vnodes.push(this.parseNode(node, i));
    }
    return vnodes;
};

Parser.prototype.parseNode = function(node, index) {
    if(!node) return null;

    var children = this.parseNodes(node.children);
    return this.renderer[node.type].apply(this.renderer, [node, children, index]);
};

Parser.prototype.parse = function(node) {
    try {
        return this.parseNode(node,  0);
    }
    catch (e) {
        console.error(e);
    }
    var h = this.renderer.h || this.renderer.options.h;
    return h?h('div', {}, 'error'):null;
};

module.exports = Parser;