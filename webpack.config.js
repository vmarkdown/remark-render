const path = require('path');
const merge = require('webpack-merge');

const config = {
    mode: 'none',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: "umd",
        library: "[name]",
        // libraryExport: 'default'
    },
    module: {
        rules: [
            {
                test: /\.md$/,
                use: 'text-loader'
            }
        ]
    },
    externals: {
        'vremark-plugin-katex': 'vremarkPluginKatex'
    },
    plugins: [

    ]
};

module.exports = [
        merge(config, {
        entry:{
            'example-hyperscript-main': './examples/hyperscript/index.js'
        },
        externals: {

        }
    })
];

