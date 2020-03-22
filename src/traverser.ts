function traverser (ast, visitors /* perNodeTypeCallbacks */) {

    function traverseArray(array, parent) {
        array.forEach((element) => {
            traverseNode(element, parent);
        });
    }

    function traverseNode(node, parent) {
        const methods = visitors[node.type];
    }

    traverseNode(ast, null)
}

module.exports = traverser;
