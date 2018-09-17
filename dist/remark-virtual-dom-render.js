(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["remark-virtual-dom-render"] = factory();
	else
		root["remark-virtual-dom-render"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ (function(module, exports) {

/**
 * Renderer interface
 */

function Renderer(options) {
    this.options = options || {};
    this._h = options.h;
}

Renderer.prototype.h = function(h) {
    if(h) {
        this._h = h;
    }
    return this._h;
};

/**
 * root element (根元素)
 * @param {*} h create element function (构建元素节点函数)
 * @param {*} node  current node  (当前根元素节点)
 * @param {*} index node index if node in array for key. default is 0 (如果当前节点在数组中，返回当前节点在数组中的序列，这是为了构建数组key)
 * @param {*} children node create element children (当前节点的子节点)
 */
Renderer.prototype.root = function(h, node, index, children) {};

Renderer.prototype.text = function(h, node, index) {};

Renderer.prototype.inlineCode = function(h, node, index, children) {};

Renderer.prototype.code = function(h, node, index, children) {};

Renderer.prototype.blockquote = function(h, node, index, children) {};

Renderer.prototype.heading = function(h, node, index, children) {};

Renderer.prototype.thematicBreak = function(h, node, index, children) {};

Renderer.prototype.list = function(h, node, index, children) {};

Renderer.prototype.listItem = function(h, node, index, children) {};

Renderer.prototype.checkbox = function(h, node, index, children) {};

Renderer.prototype.paragraph = function(h, node, index, children) {};

Renderer.prototype.table = function(h, node, index, children) {};

Renderer.prototype.tableRow = function(h, node, index, children) {};

Renderer.prototype.tableCell = function(h, node, index, children) {};

Renderer.prototype.strong = function(h, node, index, children) {};

Renderer.prototype.emphasis = function(h, node, index, children) {};

Renderer.prototype.break = function(h, node, index, children) {};

Renderer.prototype.delete = function(h, node, index, children) {};

Renderer.prototype.link = function(h, node, index, children) {};

Renderer.prototype.linkReference = function(h, node, index, children) {};

Renderer.prototype.definition = function(h, node, index, children) {};

Renderer.prototype.image = function(h, node, index, children) {};

Renderer.prototype.imageReference = function(h, node, index, children) {};

Renderer.prototype.math = function(h, node, index, children) {};

Renderer.prototype.inlineMath = function(h, node, index, children) {};

Renderer.prototype.html = function(h, node, index, children) {};

module.exports = Renderer;


/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Renderer
 */

var Renderer = __webpack_require__(3);

Renderer.prototype.root = function(h, node, index, children) {
    return h('div', {
        key: index,
        className: this.options.rootClassName || 'markdown-body'
    }, children);
};

Renderer.prototype.inlineCode = function(h, node, index, children) {
    return h('code', {
        key: index,
    }, node.value);
};

Renderer.prototype.math = function(h, node, index, children) {
    return h('p', {
        key: index,
        dangerouslySetInnerHTML: {
            __html: node.renderedValue
        }
    });
};

Renderer.prototype.inlineMath = function(h, node, index, children) {
    return h('span', {
        key: index,
        dangerouslySetInnerHTML: {
            __html: node.renderedValue
        }
    });
};

Renderer.prototype.code = function(h, node, index, children) {
    return h('pre', {
        key: index
    }, h('code', {
        className: node.lang?'language-'+node.lang:''
    }, node.value));
};

Renderer.prototype.blockquote = function(h, node, index, children) {
    return h('blockquote', {
        key: index
    }, children);
};

Renderer.prototype.html = function(h, node, index, children) {
    return h('div', {
        key: index,
        dangerouslySetInnerHTML: {
            __html: node.value
        }
    });
};

Renderer.prototype.heading = function(h, node, index, children) {
    return h('h'+node.depth, {
        key: index
    }, children);
};

Renderer.prototype.thematicBreak = function(h, node, index, children) {
    return h('hr', {
        key: index
    });
};

Renderer.prototype.list = function(h, node, index, children) {
    return h(node.ordered?'ol':'ul', {
        key: index
    }, children);
};

Renderer.prototype.listItem = function(h, node, index, children) {
    return h('li', {
        key: index
    }, children);
};

Renderer.prototype.checkbox = function(h, node, index, children) {
    return h('input', {
        key: index,
        type: 'checkbox',
        checked: node.checked,
        readOnly: true
    });
};

Renderer.prototype.paragraph = function(h, node, index, children) {
    return h('p', {
        key: index
    }, children);
};

Renderer.prototype.table = function(h, node, index, children) {
    return h('table', {
            key: index
        },
        h('tbody',{key:0}, children)
    );
};

Renderer.prototype.tableRow = function(h, node, index, children) {
    return h('tr', {
        key: index
    }, children);
};

Renderer.prototype.tableCell = function(h, node, index, children) {
    return h('td', {
        key: index,
        align: node.align
    }, children);
};

Renderer.prototype.strong = function(h, node, index, children) {
    return h('strong', {
        key: index
    }, children);
};

Renderer.prototype.emphasis = function(h, node, index, children) {
    return h('em', {
        key: index
    }, children);
};

Renderer.prototype.break = function(h, node, index, children) {
    return h('br', {
        key: index
    });
};

Renderer.prototype.delete = function(h, node, index, children) {
    return h('del', {
        key: index
    }, children);
};

Renderer.prototype.link = function(h, node, index, children) {
    return h('a', {
        key: index,
        href: node.url,
        title: node.title
    }, children);
};

Renderer.prototype.linkReference = function(h, node, index, children) {
    return h('a', {
        key: index,
        href: node.url,
        title: node.title
    }, children);
};

Renderer.prototype.definition = function(h, node, index, children) {
    return h('div', {
            key: index,
            style: {
                height: 0,
                visibility: 'hidden'
            }
        },
        h('a', {
            key: 0,
            href: node.url,
            'data-identifier': node.identifier
        }, [
            '['+node.identifier+']: ',
            node.url
        ])
    );
};

Renderer.prototype.image = function(h, node, index, children) {
    return h('img', {
        key: index,
        src: node.url,
        alt: node.alt,
        title: node.title
    });
};

Renderer.prototype.text = function(h, node, index, children) {
    return h('span', {
        key: index
    }, node.value);
};

module.exports = Renderer;


/***/ })

/******/ });
});