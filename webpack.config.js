const path = require('path');

module.exports = {
    mode: 'none',
    entry:{
        'remark-render': './src/remark-render.js',
        'remark-hyperscript-render': './src/renderers/hyperscript/renderer.js',
        'remark-react-render': './src/renderers/react/renderer.js',
        'remark-virtual-dom-render': './src/renderers/virtual-dom/renderer.js',
        'remark-vue-render': './src/renderers/vue/renderer.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: "umd",
        library: "[name]",
        // libraryExport: 'default'
    },
    module: {
    },
    externals: {
    },
    plugins: [

    ]
};

