const extend = require('extend');

function extendProps(node, props) {
    if(!node.data){
        node.data = {};
    }
    extend(node.data, props);
}

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
    this.h = options.h;
}

Parser.prototype.parseNodes = function(nodes) {
    if(!nodes || nodes.length === 0) return [];
    var vnodes = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        extendProps(node, {key: i});
        vnodes.push(this.parseNode(node));
    }
    return vnodes;
};

Parser.prototype.parseNode = function(node) {
    if(!node) return null;
    var children = this.parseNodes(node.children);
    var h = this.h;
    return this.renderer[node.type].apply(this.renderer, [h, node, children]);
};

Parser.prototype.parse = function(root, _h) {
    try {
        // _h && (this.renderer.h = _h);
        _h && (this.h = _h);
        extendProps(root, {
            key: 0,
            className: this.options.rootClassName || 'markdown-body'
        });
        return this.parseNode(root);
    }
    catch (e) {
        console.error(e);
        return this.h?this.h('div', {}, 'error'):null;
    }
    // return null;
    // var h = _h || this.options.h || this.renderer.h || this.renderer.options.h;
    // return h?h('div', {}, 'error'):null;
};

module.exports = Parser;