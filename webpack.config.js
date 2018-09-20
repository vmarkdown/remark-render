const path = require('path');
const merge = require('webpack-merge');
const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: "umd",
        library: "remarkRender"
    },
    module: {
    },
    externals: {
    },
    plugins: [

    ]
};

module.exports = [
    merge(config, {
        entry: {
            'remark-render': './src/index'
        }
    }),
    merge(config, {
        mode: 'production',
        entry: {
            'remark-render.min': './src/index'
        }
    })
];

