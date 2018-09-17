// 'use strict';
// const chai = require('chai');
// const expect = chai.expect;
// const React = require('react');
// const h = React.createElement;
// const h = require('hyperscript')
//
// const unified = require('unified');
// const parse = require('remark-parse');
// const render = require('../src/index');
// const ReactRenderer = require('../src/renderers/react/renderer');
//
// const rootClassName = 'markdown-body';
// const md = '';
//
// describe('root-class-name', function() {
//
//     const renderer = new ReactRenderer({
//         h: h,
//         rootClassName: rootClassName
//     });
//
//     const processor = unified()
//         .use(parse, {})
//         .use(render, {
//             renderer: renderer
//         });
//
//     it('root element class should return rootClassName', function() {
//         const file = processor.processSync(md);
//         const vdom = file.contents;
//         expect(vdom.props).to.have.property('className', rootClassName);
//     });
//
// });
