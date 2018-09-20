var Parser = require('./parser');

module.exports = function plugin(options) {

    var self = this;

    var renderer = this.data('renderer') || options.renderer;

    var parser = new Parser(options);
    parser.renderer = renderer;

    this.Compiler = function compiler(node) {
        var h = self.data('h');
        h && (parser.h = h);
        return parser.parse(node);
    }
};