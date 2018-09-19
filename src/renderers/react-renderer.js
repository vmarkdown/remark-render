/**
 * react Renderer
 */
const extend = require('extend');

function props(node, defaultProps) {

    var dataProps = extend({}, node.props);

    // if(node.position) {
    //     extend(dataProps, {
    //         'data-start-line': node.position.start.line,
    //         'data-end-line': node.position.end.line
    //     });
    // }

    return extend({}, dataProps, defaultProps);
}

function Renderer(options) {
    this.options = options || {};
}

Renderer.prototype.root = function(h, node, children) { 
    return h('div', props(node), children);
};

Renderer.prototype.blockquote = function(h, node, children) { 
    return h('blockquote', props(node), children);
};

Renderer.prototype.heading = function(h, node, children) { 
    return h('h'+node.depth, props(node), children);
};

Renderer.prototype.thematicBreak = function(h, node) { 
    return h('hr', props(node));
};

Renderer.prototype.list = function(h, node, children) { 
    return h(node.ordered?'ol':'ul', props(node), children);
};

Renderer.prototype.listItem = function(h, node, children) { 
    return h('li', props(node), children);
};

Renderer.prototype.checkbox = function(h, node) {
    return h('input', props(node, {
        type: 'checkbox',
        checked: node.checked,
        readOnly: true
    }));
};

Renderer.prototype.paragraph = function(h, node, children) { 
    return h('p', props(node), children);
};

Renderer.prototype.table = function(h, node, children) { 
    return h('table', props(node), h('tbody',{key:0}, children));
};

Renderer.prototype.tableRow = function(h, node, children) { 
    return h('tr', props(node), children);
};

Renderer.prototype.tableCell = function(h, node, children) { 
    return h('td', props(node, {align: node.align}), children);
};

Renderer.prototype.strong = function(h, node, children) {
    return h('strong', props(node), children);
};

Renderer.prototype.emphasis = function(h, node, children) { 
    return h('em', props(node), children);
};

Renderer.prototype.break = function(h, node) { 
    return h('br', props(node));
};

Renderer.prototype.delete = function(h, node, children) { 
    return h('del', props(node), children);
};

Renderer.prototype.link = function(h, node, children) { 
    return h('a', props(node, {
        href: node.url,
        title: node.title
    }), children);
};

Renderer.prototype.linkReference = function(h, node, children) { 
    return h('a', props(node, {
        href: node.url,
        title: node.title
    }), children);
};

Renderer.prototype.definition = function(h, node, children) { 
    return h('div', props(node, {
            style: {
                height: 0,
                visibility: 'hidden'
            }
        }),
        h('a', {
            key: 0,
            href: node.url,
            'data-identifier': node.identifier
        }, [
            '['+node.identifier+']: ',
            node.url
        ])
    );
};

Renderer.prototype.image = function(h, node) {
    return h('img', props(node, {
        src: node.url,
        alt: node.alt,
        title: node.title
    }));
};

Renderer.prototype.text = function(h, node) { 
    return h('span', props(node), node.value);
};

Renderer.prototype.inlineCode = function(h, node, children) { 
    return h('code', props(node), node.value);
};

Renderer.prototype.code = function(h, node, children) { 
    return h('pre', props(node), h('code', {
        className: node.lang?'language-'+node.lang:null
    }, node.value));
};

Renderer.prototype.math = function(h, node, children) { 
    return h('p', props(node, {
        dangerouslySetInnerHTML: {
            __html: node.value
        }
    }));
};

Renderer.prototype.inlineMath = function(h, node, children) { 
    return h('span', props(node, {
        dangerouslySetInnerHTML: {
            __html: node.value
        }
    }));
};

Renderer.prototype.html = function(h, node, children) { 
    return h('div', props(node, {
        dangerouslySetInnerHTML: {
            __html: node.value
        }
    }));
};

module.exports = Renderer;
