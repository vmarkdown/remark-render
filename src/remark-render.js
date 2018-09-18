var Parser = require('./parser');

module.exports = function plugin(options) {
    var parser = new Parser(options);

    var self = this;

    this.Compiler = function compiler(node) {
        // console.log(self.data('h'))
        var h = self.data('h');
        return parser.parse(node, h);
    }
};