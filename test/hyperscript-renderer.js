'use strict';
const chai = require('chai');
const expect = chai.expect;
const h = require('hyperscript');
const unified = require('unified');
const parse = require('remark-parse');
const render = require('../src/index');
const Renderer = require('../src/renderers/hyperscript/renderer');

describe('hyperscript-renderer', function() {

    const rootClassName = 'rootClassName';
    const renderer = new Renderer({
        h: h,
        rootClassName: rootClassName
    });

    let processor = null;

    before(function() {

        processor = unified()
            .use(parse, {})
            .use(render, {
                renderer: renderer
            });

    });

    describe('#root()', function() {

        it('root element class should return rootClassName', function() {
            const md = '';
            const file = processor.processSync(md);
            const vdom = file.contents;
            expect(vdom).to.have.property('className', rootClassName);
        });

        it('root element tagName should return div', function() {
            const md = '';
            const file = processor.processSync(md);
            const vdom = file.contents;
            expect(vdom.tagName).to.equal('div');
        });

    });

    describe('#text()', function() {

        it('test render text', function() {
            const md = 'text';
            const file = processor.processSync(md);
            const vdom = file.contents;
            const text = vdom.childNodes[0].childNodes[0];
            expect(text.tagName).to.equal('span');
            expect(text.childNodes[0].value).to.equal('text');
        });

    });


});
