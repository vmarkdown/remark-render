/**
 * hyperscript Renderer
 */

function Renderer(options) {
    this.options = options || {};
    this.h = options.h;
}

Renderer.prototype.root = function(node, children) { var h = this.h;
    var rootClassName = this.options.rootClassName || 'markdown-body';
    return h('div' , {
        className: rootClassName
    }, children);
};

Renderer.prototype.text = function(node, children) { var h = this.h;
    return h('span', {
    }, node.value);
};

Renderer.prototype.inlineCode = function(node, children) { var h = this.h;
    return h('code', {
    }, node.value);
};

Renderer.prototype.code = function(node, children) { var h = this.h;
    return h('pre', {
    }, h('code', {
        className: node.lang?'language-'+node.lang:''
    }, node.value));
};

Renderer.prototype.blockquote = function(node, children) { var h = this.h;
    return h('blockquote', {
    }, children);
};

Renderer.prototype.heading = function(node, children) { var h = this.h;
    return h('h'+node.depth, {
    }, children);
};

Renderer.prototype.thematicBreak = function(node, children) { var h = this.h;
    return h('hr', {
    });
};

Renderer.prototype.list = function(node, children) { var h = this.h;
    return h(node.ordered?'ol':'ul', {
    }, children);
};

Renderer.prototype.listItem = function(node, children) { var h = this.h;
    return h('li', {
    }, children);
};

Renderer.prototype.checkbox = function(node, children) { var h = this.h;
    return h('input', {
        type: 'checkbox',
        checked: node.checked,
        readOnly: true
    });
};

Renderer.prototype.paragraph = function(node, children) { var h = this.h;
    return h('p', {
    }, children);
};

Renderer.prototype.table = function(node, children) { var h = this.h;
    return h('table', {},
        h('tbody',{key:0}, children)
    );
};

Renderer.prototype.tableRow = function(node, children) { var h = this.h;
    return h('tr', {}, children);
};

Renderer.prototype.tableCell = function(node, children) { var h = this.h;
    return h('td', {
        align: node.align
    }, children);
};

Renderer.prototype.strong = function(node, children) { var h = this.h;
    return h('strong', {
    }, children);
};

Renderer.prototype.emphasis = function(node, children) { var h = this.h;
    return h('em', {
    }, children);
};

Renderer.prototype.break = function(node, children) { var h = this.h;
    return h('br', {
    });
};

Renderer.prototype.delete = function(node, children) { var h = this.h;
    return h('del', {
    }, children);
};

Renderer.prototype.link = function(node, children) { var h = this.h;
    return h('a', {
        href: node.url,
        title: node.title
    }, children);
};

Renderer.prototype.linkReference = function(node, children) { var h = this.h;
    return h('a', {
        href: node.url,
        title: node.title
    }, children);
};

Renderer.prototype.definition = function(node, children) { var h = this.h;
    return h('div', {
            style: {
                height: '0',
                visibility: 'hidden'
            }
        },
        h('a', {
            href: node.url,
            'data-identifier': node.identifier
        }, [
            '['+node.identifier+']: ',
            node.url
        ])
    );
};

Renderer.prototype.image = function(node, children) { var h = this.h;
    return h('img', {
        src: node.url,
        alt: node.alt,
        title: node.title
    });
};

Renderer.prototype.math = function(node, children) { var h = this.h;
    return h('p', {
        innerHTML : node.renderedValue
    });
};

Renderer.prototype.inlineMath = function(node, children) { var h = this.h;
    return h('span', {
        innerHTML : node.renderedValue
    });
};

Renderer.prototype.html = function(node, children) { var h = this.h;
    return h('div', {
        innerHTML : node.value
    });
};

module.exports = Renderer;

