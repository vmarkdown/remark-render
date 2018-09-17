var isArray = (function isArray() {
    if (Array.isArray) return Array.isArray;
    return function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
})();

function Parser(options) {
    this.options = options;
    this.renderer = options.renderer;
}

Parser.prototype.parseNodes = function(nodes) {
    if(!nodes || nodes.length === 0) return [];

    var vnodes = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        vnodes.push(this.parse(node, i));
    }
    return vnodes;
};

Parser.prototype.parseNode = function(node, index) {
    if(!node) return null;

    if(!this.renderer[node.type]){
        throw new Error('renderer no method:'+ node.type);
    }

    var h = this.renderer.h();
    if(!h){
        throw new Error('h not found.');
    }

    // var children = (node.children && node.children.length>0)?this.parse(node.children):[];
    var children = this.parseNodes(node.children);
    return this.renderer[node.type].apply(this.renderer, [h, node, index, children]);
};

Parser.prototype.parse = function(node, index) {
    if( isArray(node) ){
        return this.parseNodes(node);
    }
    return this.parseNode(node, index || 0);
};

module.exports = Parser;