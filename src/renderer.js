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
    root : function(h, node, children) {},

    text : function(h, node, children) {},

    inlineCode : function(h, node, children) {},

    blockquote : function(h, node, children) {},

    heading : function(h, node, children) {},

    thematicBreak : function(h, node, children) {},

    list : function(h, node, children) {},

    listItem : function(h, node, children) {},

    checkbox : function(h, node, children) {},

    paragraph : function(h, node, children) {},

    table : function(h, node, children) {},

    tableRow : function(h, node, children) {},

    tableCell : function(h, node, children) {},

    strong : function(h, node, children) {},

    emphasis : function(h, node, children) {},

    break : function(h, node, children) {},

    delete : function(h, node, children) {},

    link : function(h, node, children) {},

    linkReference : function(h, node, children) {},

    definition : function(h, node, children) {},

    image : function(h, node, children) {},

    imageReference : function(h, node, children) {},

    math : function(h, node, children) {},

    inlineMath : function(h, node, children) {},

    html : function(h, node, children) {},

    code : function(h, node, children) {},
};