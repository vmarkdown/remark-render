const Renderer = require('../../src/renderers/react/renderer');

const h = React.createElement;
const renderer = new Renderer({
    h: h,
    rootClassName: 'markdown-body'
});

const vremarkPluginKatex = require('vremark-plugin-katex');
// const mdText = require('../md/test.txt');

const processor = vremark({
    renderer: renderer
}).use(vremarkPluginKatex);

// const previewIframe = document.getElementById('preview');

function parse(md) {
    const file = processor.processSync(md);
    const vdom = file.contents;
    return vdom;
}

class Preview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            md: require('../md/toc.txt')
        };
    }

    componentDidMount() {
        // const vdom = parse(mdText);
        // this.setState({
        //     md: '# h1\n##h2 \n'+ new Date().getTime()
        // });
        // this.refresh();
        // setInterval(()=>{
        //     this.refresh();
        // }, 3000);
    }

    refresh() {
        // const vdom = parse('# h1\n##h2 \n'+ new Date().getTime());
        // this.setState({
        //     md: '# h1\n## h2  \n'+ new Date().getTime()
        // });

        const md = '# h1';
        this.setState({
            md: md
        });
    }

    render() {
        const vdom = parse(this.state.md);

        console.log(vdom);

        return vdom;
        // return h('div', {
        //     className: 'preview-container'
        // }, vdom,
        //     h('div',{style:{textAlign:'center'}},[
        //         h('button', {
        //             key: 'div_refresh',
        //             className:'refresh-btn',
        //             onClick: ()=>{
        //                 this.refresh();
        //             }
        //         }, 'refresh'),
        //     ])
        // );
    }
}

// previewIframe.onload = function () {
//     ReactDOM.render(
//         h(Preview),
//         document.getElementById('preview')
//     );
// };

ReactDOM.render(
    h(Preview),
    document.getElementById('preview')
);
