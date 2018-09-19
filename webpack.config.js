const path = require('path');

module.exports = {
    mode: 'none',
    entry:{
        'remark-render': './src/remark-render.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: "umd",
        library: "[name]"
    },
    module: {
    },
    externals: {
    },
    plugins: [

    ]
};

