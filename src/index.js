var Parser = require('./parser');

module.exports = function plugin(options) {
    var renderer = options.renderer;

    if(!renderer) {
        throw new Error('renderer not found. Did you specify the correct plugin option?');
    }

    var parser = new Parser({
        renderer: renderer
    });

    this.Compiler = function compiler(node) {
        return parser.parse(node);
    }
};


