var extend = require('extend');

function extendProps(node, props) {
    if(!node.properties){ node.properties = {}; }
    extend(node.properties, props);
}

function hash(str) {
    var hash = 5381, i = str.length;
    while(i) {
        hash = (hash * 33) ^ str.charCodeAt(--i);
    }
    return hash >>> 0;
}

function createKeyByNodes(nodes) {
    if(!nodes || nodes.length===0){
        return
    }
    for(var i=0;i<nodes.length;i++) {
        var node = nodes[i];
        createKeyByNode(node);
    }
}

function createKeyByNode(node) {
    extendProps(node);
    createKeyByNodes(node.children);
    if(node.value) {
        node.properties.key = hash(node.value);
    }
    else if(node.children) {
        var key = node.children.map(function (item) {
            return item.properties.key;
        }).join('-');
        node.properties.key = hash(key);
    }
    else {
        var position = node.position;
        node.properties.key = hash(position.start.line + '-' +position.end.line);
    }
}

function createKey(node) {
    createKeyByNodes(node.children);
    createKeyByNode(node);
}

module.exports = createKey;
