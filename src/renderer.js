/**
 * Renderer interface
 */

module.exports = {

    /**
     * root element (根元素)
     * @param {*} h create element function (构建元素节点函数)
     * @param {*} node  current node  (当前根元素节点)
 *              node.key is node index if node in array for key. default is 0 (如果当前节点在数组中，返回当前节点在数组中的序列，这是为了构建数组key)
     * @param {*} children node create element children (当前节点的子节点)
     */
    root : function(h, node, children, options) {},

    text : function(h, node, children, options) {},

    inlineCode : function(h, node, children, options) {},

    blockquote : function(h, node, children, options) {},

    heading : function(h, node, children, options) {},

    thematicBreak : function(h, node, children, options) {},

    list : function(h, node, children, options) {},

    listItem : function(h, node, children, options) {},

    checkbox : function(h, node, children, options) {},

    paragraph : function(h, node, children, options) {},

    table : function(h, node, children, options) {},

    tableRow : function(h, node, children, options) {},

    tableCell : function(h, node, children, options) {},

    strong : function(h, node, children, options) {},

    emphasis : function(h, node, children, options) {},

    break : function(h, node, children, options) {},

    delete : function(h, node, children, options) {},

    link : function(h, node, children, options) {},

    linkReference : function(h, node, children, options) {},

    definition : function(h, node, children, options) {},

    image : function(h, node, children, options) {},

    imageReference : function(h, node, children, options) {},

    math : function(h, node, children, options) {},

    inlineMath : function(h, node, children, options) {},

    html : function(h, node, children, options) {},

    code : function(h, node, children, options) {},
};