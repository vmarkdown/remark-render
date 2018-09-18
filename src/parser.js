function getRenderer(mode) {
    switch (mode){
        case 'react' :
            return require('./renderers/react-renderer');
        case 'vue' :
            return require('./renderers/vue-renderer');
        case 'hyperscript' :
            return require('./renderers/hyperscript-renderer');
        case 'preact' :
            return require('./renderers/preact-renderer');
        case 'snabbdom' :
            return require('./renderers/snabbdom-renderer');
        case 'virtual-dom' :
            return require('./renderers/virtual-dom-renderer');
    }
    return null;
}

function Parser(options) {
    var Renderer = options.Renderer?options.Renderer:getRenderer(options.mode);
    this.options = options;
    this.renderer = new Renderer(options);
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

Parser.prototype.parse = function(node, _h) {
    _h && (this.renderer.h = _h);
    try {
        return this.parseNode(node,  0);
    }
    catch (e) {
        console.error(e);
    }
    var h = _h || this.options.h || this.renderer.h || this.renderer.options.h;
    return h?h('div', {}, 'error'):null;
};

module.exports = Parser;