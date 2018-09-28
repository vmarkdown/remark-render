const unified = require('unified');
const parse = require('remark-parse');
const render = require('../../index');
const renderer = require('remark-preact-renderer');

const processor = unified()
    .use(parse, {})
    .use(render, {
        renderer: renderer,
        h: preact.h,
        rootClassName: 'markdown-body',
        rootTagName: 'main'
    });

// const file = processor.processSync(require('../md/maxiang.md'));
// const vdom = file.contents;
//
// preact.render(
//     vdom,
//     document.getElementById('preview')
// );

(function () {
    // var p = processor.parse(require('../md/maxiang.md'));
    // console.log(JSON.stringify(p));
    // console.log(processor.runSync(p));


    let md = require('../md/maxiang.md');


    const file = processor.processSync(md);
    const vdom = file.contents;
    console.log(vdom);

})();


(function () {
    // var p = processor.parse(require('../md/maxiang.md'));
    // console.log(p);
    // console.log(processor.runSync(p));

    let md = require('../md/maxiang.md');
    md = '###### h6  '+'\n'+md;
    const file = processor.processSync(md);
    const vdom = file.contents;
    console.log(vdom);

})();