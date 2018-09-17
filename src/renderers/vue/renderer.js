/**
 * Renderer
 */

var Renderer = require('../../renderer');

Renderer.prototype.root = function(h, node, index, children) {
    return h('div', {
        key: index,
        'class': [this.options.rootClassName || 'markdown-body']
    }, children);
};

Renderer.prototype.inlineCode = function(h, node, index, children) {
    return h('code', {
        key: index,
    }, node.value);
};

Renderer.prototype.math = function(h, node, index, children) {
    return h('p', {
        key: index,
        domProps:{
            "innerHTML": node.renderedValue
        }
    });
};

Renderer.prototype.inlineMath = function(h, node, index, children) {
    return h('span', {
        key: index,
        domProps:{
            "innerHTML": node.renderedValue
        }
    });
};

Renderer.prototype.html = function(h, node, index, children) {
    return h('div', {
        key: index,
        domProps:{
            "innerHTML": node.value
        }
    });
};

Renderer.prototype.code = function(h, node, index, children) {
    return h('pre', {
        key: index
    }, [
        h('code', {
            'class': [node.lang?'language-'+node.lang:'']
        }, node.value)
    ]);
};

Renderer.prototype.blockquote = function(h, node, index, children) {
    return h('blockquote', {
        key: index
    }, children);
};



Renderer.prototype.heading = function(h, node, index, children) {
    return h('h'+node.depth, {
        key: index
    }, children);
};

Renderer.prototype.thematicBreak = function(h, node, index, children) {
    return h('hr', {
        key: index
    });
};

Renderer.prototype.list = function(h, node, index, children) {
    return h(node.ordered?'ol':'ul', {
        key: index
    }, children);
};

Renderer.prototype.listItem = function(h, node, index, children) {
    return h('li', {
        key: index
    }, children);
};

Renderer.prototype.checkbox = function(h, node, index, children) {
    return h('input', {
        key: index,
        attrs: {
            type: 'checkbox',
            checked: node.checked,
            disabled: true
        }
    });
};

Renderer.prototype.paragraph = function(h, node, index, children) {
    return h('p', {
        key: index
    }, children);
};

Renderer.prototype.table = function(h, node, index, children) {
    return h('table', {
            key: index
        },
        [h('tbody',{key:0}, children)]
    );
};

Renderer.prototype.tableRow = function(h, node, index, children) {
    return h('tr', {
        key: index
    }, children);
};

Renderer.prototype.tableCell = function(h, node, index, children) {
    return h('td', {
        key: index,
        align: node.align
    }, children);
};

Renderer.prototype.strong = function(h, node, index, children) {
    return h('strong', {
        key: index
    }, children);
};

Renderer.prototype.emphasis = function(h, node, index, children) {
    return h('em', {
        key: index
    }, children);
};

Renderer.prototype.break = function(h, node, index, children) {
    return h('br', {
        key: index
    });
};

Renderer.prototype.delete = function(h, node, index, children) {
    return h('del', {
        key: index
    }, children);
};

Renderer.prototype.link = function(h, node, index, children) {
    return h('a', {
        key: index,
        attrs:{
            target: '_blank',
            href: node.url,
            title: node.title
        }
    }, children);
};

Renderer.prototype.linkReference = function(h, node, index, children) {
    return h('a', {
        key: index,
        attrs:{
            target: '_blank',
            href: node.url,
            title: node.title
        }
    }, children);
};

Renderer.prototype.definition = function(h, node, index, children) {
    return h('div', {
            key: index,
            style: {
                // height: 0,
                // visibility: 'hidden'
                'word-break': 'break-all'
            }
        },[
            h('a', {
                key: 0,
                attrs: {
                    target: '_blank',
                    href: node.url,
                    'data-identifier': node.identifier
                }
            }, [
                '['+node.identifier+']: ',
                node.url
            ])
        ]
    );
};

Renderer.prototype.image = function(h, node, index, children) {
    return h('img', {
        key: index,
        attrs: {
            src: node.url,
            alt: node.alt,
            title: node.title
        }
    });
};

Renderer.prototype.text = function(h, node, index, children) {
    return h('span', {
        key: index
    }, node.value);
};

module.exports = Renderer;
