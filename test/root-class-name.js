'use strict';
const chai = require('chai');
const expect = chai.expect;
const h = require('hyperscript');
const unified = require('unified');
const parse = require('remark-parse');
const render = require('../src/index');
const Renderer = require('../src/renderers/hyperscript/renderer');

describe('root-class-name', function() {

    const rootClassName = 'rootClassName';
    const md = '';

    const renderer = new Renderer({
        h: h,
        rootClassName: rootClassName
    });

    const processor = unified()
        .use(parse, {})
        .use(render, {
            renderer: renderer
        });

    it('root element class should return rootClassName', function() {
        const file = processor.processSync(md);
        const vdom = file.contents;
        expect(vdom).to.have.property('className', rootClassName);
    });

});
