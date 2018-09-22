'use strict';

var xtend = require('xtend');
var Parser = require('./parser');

function Compiler(root, file) {
    this.root = root;
    this.file = file;

    this.options = xtend(this.options);
    if(this.options.renderer){
        this.visitors = this.options.renderer;
    }

    this.parser = new Parser(this.options);
}

Compiler.prototype.compile = function() {
    return this.parser.parse(this.root);
};

Compiler.prototype.visitors = require('./renderer');

module.exports = Compiler;
