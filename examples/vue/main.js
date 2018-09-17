const Renderer = require('../../src/renderers/vue/renderer');

const renderer = new Renderer({
    rootClassName: 'markdown-body'
});

const vremarkPluginKatex = require('vremark-plugin-katex');

const processor = vremark({
    renderer: renderer
}).use(vremarkPluginKatex);

function parse(md) {
    const file = processor.processSync(md);
    return file.contents;
}

const md = require('../md/maxiang.txt');



const app = new Vue({
    el: '#app',
    data: {
        md: md
    },
    render(h) {
        renderer.h(h);
        console.time('parse');
        const vdom = parse(this.md);
        console.timeEnd('parse')
        return vdom;


        // const vdom = parse(require('../md/maxiang.txt'));
        // console.log(vdom);
        // return vdom;


        // var el = h('div',{
        //     'class': {
        //         'markdown-body': true
        //     }
        // },vnodes);
        // //
        // console.log(el);
        //
        // return el
    },
    mounted() {

        // setInterval(() => {
        //     this.md = md.replace('欢迎使用马克飞象', new Date().getTime());
        // }, 5000);

    }
});