// 'use strict';
// const chai = require('chai');
// const expect = chai.expect;
// const React = require('react');
// const h = React.createElement;
// const unified = require('unified');
// const parse = require('remark-parse');
// const render = require('../src/index');
// const ReactRenderer = require('../src/renderers/react/renderer');
//
// const processor = unified()
//     .use(parse, {})
//     .use(render, {
//         renderer: new ReactRenderer({
//             h: h,
//             rootClassName: 'markdown-body'
//         })
//     });
//
// const md = `# h1
// ## h2
// ### h3
// `;
//
// describe('hr', function() {
//
//     it('* * *', function() {
//
//         const file = processor.processSync(md);
//         const vdom = file.contents;
//
//         console.log(vdom)
//
//         expect('hr').to.equal('hr');
//         // expect('').to.equal()
//
//
//         // let vnodes = vmarked('* * *');
//         //
//         // expect(vnodes).to.have.lengthOf(1);
//         //
//         // expect(vnodes[0]).to.have.property('tag', 'hr');
//     });
//
// });
