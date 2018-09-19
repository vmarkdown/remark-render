(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["remarkRender"] = factory();
	else
		root["remarkRender"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Parser = __webpack_require__(1);

module.exports = function plugin(options) {

    var mode = this.data('mode') || options.mode;
    options.mode = mode;

    var parser = new Parser(options);

    var self = this;

    self.data('renderer', parser.renderer);

    this.Compiler = function compiler(node) {
        var h = self.data('h');
        return parser.parse(node, h);
    }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const extend = __webpack_require__(2);

function extendProps(node, props) {
    if(!node.props){
        node.props = {};
    }
    extend(node.props, props);
}

function getRenderer(mode) {
    switch (mode){
        case 'react' :
            return __webpack_require__(3);
        case 'vue' :
            return __webpack_require__(4);
        case 'hyperscript' :
            return __webpack_require__(5);
        case 'preact' :
            return __webpack_require__(6);
        case 'snabbdom' :
            return __webpack_require__(7);
        case 'virtual-dom' :
            return __webpack_require__(8);
    }
    return null;
}

function Parser(options) {
    var Renderer = options.Renderer?options.Renderer:getRenderer(options.mode);
    this.options = options;
    this.renderer = new Renderer(options);
    this.h = options.h;
}

Parser.prototype.parseNodes = function(nodes) {
    if(!nodes || nodes.length === 0) return [];
    var vnodes = [];
    for(var i=0;i<nodes.length;i++){
        var node = nodes[i];
        extendProps(node, {key: i});
        vnodes.push(this.parseNode(node));
    }
    return vnodes;
};

Parser.prototype.parseNode = function(node) {
    if(!node) return null;
    var children = this.parseNodes(node.children);
    var h = this.h;
    return this.renderer[node.type].apply(this.renderer, [h, node, children]);
};

Parser.prototype.parse = function(root, _h) {
    try {
        _h && (this.h = _h);
        extendProps(root, {
            key: 0,
            className: this.options.rootClassName || 'markdown-body'
        });
        return this.parseNode(root);
    }
    catch (e) {
        console.error(e);
        return this.h?this.h('div', {}, 'error'):null;
    }
};

module.exports = Parser;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
	if (typeof Array.isArray === 'function') {
		return Array.isArray(arr);
	}

	return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
	if (!obj || toStr.call(obj) !== '[object Object]') {
		return false;
	}

	var hasOwnConstructor = hasOwn.call(obj, 'constructor');
	var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');
	// Not own constructor property must be Object
	if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
		return false;
	}

	// Own properties are enumerated firstly, so to speed up,
	// if last one is own, then all properties are own.
	var key;
	for (key in obj) { /**/ }

	return typeof key === 'undefined' || hasOwn.call(obj, key);
};

// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target
var setProperty = function setProperty(target, options) {
	if (defineProperty && options.name === '__proto__') {
		defineProperty(target, options.name, {
			enumerable: true,
			configurable: true,
			value: options.newValue,
			writable: true
		});
	} else {
		target[options.name] = options.newValue;
	}
};

// Return undefined instead of __proto__ if '__proto__' is not an own property
var getProperty = function getProperty(obj, name) {
	if (name === '__proto__') {
		if (!hasOwn.call(obj, name)) {
			return void 0;
		} else if (gOPD) {
			// In early versions of node, obj['__proto__'] is buggy when obj has
			// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
			return gOPD(obj, name).value;
		}
	}

	return obj[name];
};

module.exports = function extend() {
	var options, name, src, copy, copyIsArray, clone;
	var target = arguments[0];
	var i = 1;
	var length = arguments.length;
	var deep = false;

	// Handle a deep copy situation
	if (typeof target === 'boolean') {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}
	if (target == null || (typeof target !== 'object' && typeof target !== 'function')) {
		target = {};
	}

	for (; i < length; ++i) {
		options = arguments[i];
		// Only deal with non-null/undefined values
		if (options != null) {
			// Extend the base object
			for (name in options) {
				src = getProperty(target, name);
				copy = getProperty(options, name);

				// Prevent never-ending loop
				if (target !== copy) {
					// Recurse if we're merging plain objects or arrays
					if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
						if (copyIsArray) {
							copyIsArray = false;
							clone = src && isArray(src) ? src : [];
						} else {
							clone = src && isPlainObject(src) ? src : {};
						}

						// Never move original objects, clone them
						setProperty(target, { name: name, newValue: extend(deep, clone, copy) });

					// Don't bring in undefined values
					} else if (typeof copy !== 'undefined') {
						setProperty(target, { name: name, newValue: copy });
					}
				}
			}
		}
	}

	// Return the modified object
	return target;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * react Renderer
 */
const extend = __webpack_require__(2);

function props(node, defaultProps) {

    var dataProps = extend({}, node.props);

    // if(node.position) {
    //     extend(dataProps, {
    //         'data-start-line': node.position.start.line,
    //         'data-end-line': node.position.end.line
    //     });
    // }

    return extend({}, dataProps, defaultProps);
}

function Renderer(options) {
    this.options = options || {};
}

Renderer.prototype.root = function(h, node, children) { 
    return h('div', props(node), children);
};

Renderer.prototype.blockquote = function(h, node, children) { 
    return h('blockquote', props(node), children);
};

Renderer.prototype.heading = function(h, node, children) { 
    return h('h'+node.depth, props(node), children);
};

Renderer.prototype.thematicBreak = function(h, node) { 
    return h('hr', props(node));
};

Renderer.prototype.list = function(h, node, children) { 
    return h(node.ordered?'ol':'ul', props(node), children);
};

Renderer.prototype.listItem = function(h, node, children) { 
    return h('li', props(node), children);
};

Renderer.prototype.checkbox = function(h, node) {
    return h('input', props(node, {
        type: 'checkbox',
        checked: node.checked,
        readOnly: true
    }));
};

Renderer.prototype.paragraph = function(h, node, children) { 
    return h('p', props(node), children);
};

Renderer.prototype.table = function(h, node, children) { 
    return h('table', props(node), h('tbody',{key:0}, children));
};

Renderer.prototype.tableRow = function(h, node, children) { 
    return h('tr', props(node), children);
};

Renderer.prototype.tableCell = function(h, node, children) { 
    return h('td', props(node, {align: node.align}), children);
};

Renderer.prototype.strong = function(h, node, children) {
    return h('strong', props(node), children);
};

Renderer.prototype.emphasis = function(h, node, children) { 
    return h('em', props(node), children);
};

Renderer.prototype.break = function(h, node) { 
    return h('br', props(node));
};

Renderer.prototype.delete = function(h, node, children) { 
    return h('del', props(node), children);
};

Renderer.prototype.link = function(h, node, children) { 
    return h('a', props(node, {
        href: node.url,
        title: node.title
    }), children);
};

Renderer.prototype.linkReference = function(h, node, children) { 
    return h('a', props(node, {
        href: node.url,
        title: node.title
    }), children);
};

Renderer.prototype.definition = function(h, node, children) { 
    return h('div', props(node, {
            style: {
                height: 0,
                visibility: 'hidden'
            }
        }),
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

Renderer.prototype.image = function(h, node) {
    return h('img', props(node, {
        src: node.url,
        alt: node.alt,
        title: node.title
    }));
};

Renderer.prototype.text = function(h, node) { 
    return h('span', props(node), node.value);
};

Renderer.prototype.inlineCode = function(h, node, children) { 
    return h('code', props(node), node.value);
};

Renderer.prototype.code = function(h, node, children) { 
    return h('pre', props(node), h('code', {
        className: node.lang?'language-'+node.lang:null
    }, node.value));
};

Renderer.prototype.math = function(h, node, children) { 
    return h('p', props(node, {
        dangerouslySetInnerHTML: {
            __html: node.value
        }
    }));
};

Renderer.prototype.inlineMath = function(h, node, children) { 
    return h('span', props(node, {
        dangerouslySetInnerHTML: {
            __html: node.value
        }
    }));
};

Renderer.prototype.html = function(h, node, children) { 
    return h('div', props(node, {
        dangerouslySetInnerHTML: {
            __html: node.value
        }
    }));
};

module.exports = Renderer;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/**
 * vue Renderer
 */

function Renderer(options) {
    this.options = options || {};
}

Renderer.prototype.root = function(node, children, index) { var h = this.h; 
    return h('div', {
        key: index,
        'class': [this.options.rootClassName || 'markdown-body']
    }, children);
};

Renderer.prototype.inlineCode = function(node, children, index) { var h = this.h; 
    return h('code', {
        key: index,
    }, node.value);
};

Renderer.prototype.code = function(node, children, index) { var h = this.h; 
    return h('pre', {
        key: index
    }, [
        h('code', {
            'class': [node.lang?'language-'+node.lang:'']
        }, node.value)
    ]);
};

Renderer.prototype.blockquote = function(node, children, index) { var h = this.h; 
    return h('blockquote', {
        key: index
    }, children);
};



Renderer.prototype.heading = function(node, children, index) { var h = this.h; 
    return h('h'+node.depth, {
        key: index
    }, children);
};

Renderer.prototype.thematicBreak = function(node, children, index) { var h = this.h; 
    return h('hr', {
        key: index
    });
};

Renderer.prototype.list = function(node, children, index) { var h = this.h; 
    return h(node.ordered?'ol':'ul', {
        key: index
    }, children);
};

Renderer.prototype.listItem = function(node, children, index) { var h = this.h; 
    return h('li', {
        key: index
    }, children);
};

Renderer.prototype.checkbox = function(node, children, index) { var h = this.h; 
    return h('input', {
        key: index,
        attrs: {
            type: 'checkbox',
            checked: node.checked,
            disabled: true
        }
    });
};

Renderer.prototype.paragraph = function(node, children, index) { var h = this.h; 
    return h('p', {
        key: index
    }, children);
};

Renderer.prototype.table = function(node, children, index) { var h = this.h; 
    return h('table', {
            key: index
        },
        [h('tbody',{key:0}, children)]
    );
};

Renderer.prototype.tableRow = function(node, children, index) { var h = this.h; 
    return h('tr', {
        key: index
    }, children);
};

Renderer.prototype.tableCell = function(node, children, index) { var h = this.h; 
    return h('td', {
        key: index,
        align: node.align
    }, children);
};

Renderer.prototype.strong = function(node, children, index) { var h = this.h; 
    return h('strong', {
        key: index
    }, children);
};

Renderer.prototype.emphasis = function(node, children, index) { var h = this.h; 
    return h('em', {
        key: index
    }, children);
};

Renderer.prototype.break = function(node, children, index) { var h = this.h; 
    return h('br', {
        key: index
    });
};

Renderer.prototype.delete = function(node, children, index) { var h = this.h; 
    return h('del', {
        key: index
    }, children);
};

Renderer.prototype.link = function(node, children, index) { var h = this.h; 
    return h('a', {
        key: index,
        attrs:{
            target: '_blank',
            href: node.url,
            title: node.title
        }
    }, children);
};

Renderer.prototype.linkReference = function(node, children, index) { var h = this.h; 
    return h('a', {
        key: index,
        attrs:{
            target: '_blank',
            href: node.url,
            title: node.title
        }
    }, children);
};

Renderer.prototype.definition = function(node, children, index) { var h = this.h; 
    return h('div', {
            key: index,
            style: {
                // height: 0,
                // visibility: 'hidden'
                'word-break': 'break-all'
            }
        },[
            h('a', {
                key: 0,
                attrs: {
                    target: '_blank',
                    href: node.url,
                    'data-identifier': node.identifier
                }
            }, [
                '['+node.identifier+']: ',
                node.url
            ])
        ]
    );
};

Renderer.prototype.image = function(node, children, index) { var h = this.h; 
    return h('img', {
        key: index,
        attrs: {
            src: node.url,
            alt: node.alt,
            title: node.title
        }
    });
};

Renderer.prototype.text = function(node, children, index) { var h = this.h; 
    return h('span', {
        key: index
    }, node.value);
};


Renderer.prototype.math = function(node, children, index) { var h = this.h;
    return h('p', {
        key: index,
        domProps: {
            "innerHTML": node.value
        }
    });
};

Renderer.prototype.inlineMath = function(node, children, index) { var h = this.h;
    return h('span', {
        key: index,
        domProps: {
            "innerHTML": node.value
        }
    });
};

Renderer.prototype.html = function(node, children, index) { var h = this.h;
    return h('div', {
        key: index,
        domProps: {
            "innerHTML": node.value
        }
    });
};

Renderer.prototype.flow = function(node, children, index) { var h = this.h;
    return h('div', {
        key: index,
        'class': [node.className || ''],
        domProps: {
            "innerHTML": node.value
        }
    });
};

module.exports = Renderer;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

/**
 * hyperscript Renderer
 */

function Renderer(options) {
    this.options = options || {};
    this.h = options.h;
}

Renderer.prototype.root = function(node, children) { var h = this.h;
    var rootClassName = this.options.rootClassName || 'markdown-body';
    return h('div' , {
        className: rootClassName
    }, children);
};

Renderer.prototype.text = function(node, children) { var h = this.h;
    return h('span', {
    }, node.value);
};

Renderer.prototype.inlineCode = function(node, children) { var h = this.h;
    return h('code', {
    }, node.value);
};

Renderer.prototype.code = function(node, children) { var h = this.h;
    return h('pre', {
    }, h('code', {
        className: node.lang?'language-'+node.lang:''
    }, node.value));
};

Renderer.prototype.blockquote = function(node, children) { var h = this.h;
    return h('blockquote', {
    }, children);
};

Renderer.prototype.heading = function(node, children) { var h = this.h;
    return h('h'+node.depth, {
    }, children);
};

Renderer.prototype.thematicBreak = function(node, children) { var h = this.h;
    return h('hr', {
    });
};

Renderer.prototype.list = function(node, children) { var h = this.h;
    return h(node.ordered?'ol':'ul', {
    }, children);
};

Renderer.prototype.listItem = function(node, children) { var h = this.h;
    return h('li', {
    }, children);
};

Renderer.prototype.checkbox = function(node, children) { var h = this.h;
    return h('input', {
        type: 'checkbox',
        checked: node.checked,
        readOnly: true
    });
};

Renderer.prototype.paragraph = function(node, children) { var h = this.h;
    return h('p', {
    }, children);
};

Renderer.prototype.table = function(node, children) { var h = this.h;
    return h('table', {},
        h('tbody',{key:0}, children)
    );
};

Renderer.prototype.tableRow = function(node, children) { var h = this.h;
    return h('tr', {}, children);
};

Renderer.prototype.tableCell = function(node, children) { var h = this.h;
    return h('td', {
        align: node.align
    }, children);
};

Renderer.prototype.strong = function(node, children) { var h = this.h;
    return h('strong', {
    }, children);
};

Renderer.prototype.emphasis = function(node, children) { var h = this.h;
    return h('em', {
    }, children);
};

Renderer.prototype.break = function(node, children) { var h = this.h;
    return h('br', {
    });
};

Renderer.prototype.delete = function(node, children) { var h = this.h;
    return h('del', {
    }, children);
};

Renderer.prototype.link = function(node, children) { var h = this.h;
    return h('a', {
        href: node.url,
        title: node.title
    }, children);
};

Renderer.prototype.linkReference = function(node, children) { var h = this.h;
    return h('a', {
        href: node.url,
        title: node.title
    }, children);
};

Renderer.prototype.definition = function(node, children) { var h = this.h;
    return h('div', {
            style: {
                height: '0',
                visibility: 'hidden'
            }
        },
        h('a', {
            href: node.url,
            'data-identifier': node.identifier
        }, [
            '['+node.identifier+']: ',
            node.url
        ])
    );
};

Renderer.prototype.image = function(node, children) { var h = this.h;
    return h('img', {
        src: node.url,
        alt: node.alt,
        title: node.title
    });
};

Renderer.prototype.math = function(node, children) { var h = this.h;
    return h('p', {
        innerHTML : node.value
    });
};

Renderer.prototype.inlineMath = function(node, children) { var h = this.h;
    return h('span', {
        innerHTML : node.value
    });
};

Renderer.prototype.html = function(node, children) { var h = this.h;
    return h('div', {
        innerHTML : node.value
    });
};

module.exports = Renderer;



/***/ }),
/* 6 */
/***/ (function(module, exports) {

/**
 * preact Renderer
 */

function Renderer(options) {
    this.options = options || {};
    this.h = options.h;
}

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


/***/ }),
/* 7 */
/***/ (function(module, exports) {



/***/ }),
/* 8 */
/***/ (function(module, exports) {

/**
 * virtual-dom Renderer
 */

function Renderer(options) {
    this.options = options || {};
    this.h = options.h;
}

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
/******/ ]);
});