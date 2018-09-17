var plugin = require('./remark-render');

plugin.renderers = {
    HyperScript: require('./renderers/hyperscript/renderer.js'),
    React: require('./renderers/react/renderer.js'),
    VirtualDom: require('./renderers/virtual-dom/renderer.js'),
    Vue: require('./renderers/vue/renderer.js')
};

module.exports = plugin;

