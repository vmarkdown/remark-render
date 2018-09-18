var Parser = require('./parser');

module.exports = function plugin(options) {

    var mode = this.data('mode') || options.mode;
    options.mode = mode;

    var parser = new Parser(options);

    var self = this;

    self.data('renderer', parser.renderer);

    this.Compiler = function compiler(node) {
        // console.log(self.data('h'))
        var h = self.data('h');
        return parser.parse(node, h);
    }
};