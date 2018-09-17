const unified = require('unified');
const parse = require('remark-parse');
const render = require('../../src/index');
const Renderer = require('../../renderers/react-renderer');

const h = React.createElement;
const renderer = new Renderer({
    h: h,
    rootClassName: 'markdown-body'
});

let processor = unified()
    .use(parse, {})
    .use(render, {
        renderer: renderer
    });

const file = processor.processSync(require('../md/syntax.md'));
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