const unified = require('unified');
const parse = require('remark-parse');
const render = require('../../src/index');

const h = React.createElement;

let processor = unified()
    .use(parse, {})
    .use(render, {
        mode: 'react',
        h: h,
        rootClassName: 'markdown-body'
    });

const file = processor.processSync(require('../md/maxiang.md'));
const vdom = file.contents;

ReactDOM.render(
    vdom,
    document.getElementById('preview')
);

// class Preview extends React.Component {
//     render() {
//         const file = processor.processSync(this.props.md);
//         return file.contents;
//     }
// }
//
// ReactDOM.render(
//     h(Preview, {
//         md: require('../md/syntax.md')
//     }),
//     document.getElementById('preview')
// );