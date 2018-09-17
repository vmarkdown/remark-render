const path = require('path');
const merge = require('webpack-merge');

const example = process.argv.slice(-1)[0];

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

const entry = {};
entry['example-'+example+'-main'] = path.resolve(__dirname, './'+example+'/index.js');

module.exports = [
    merge(config, {
        entry: entry,
        externals: {

        }
    })
];

