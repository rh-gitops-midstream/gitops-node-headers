/*!
 * react-svg-piechart v2.4.0 - https://github.com/xuopled/react-svg-piechart#readme
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("prop-types"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "prop-types"], factory);
	else if(typeof exports === 'object')
		exports["ReactSvgPiechart"] = factory(require("react"), require("prop-types"));
	else
		root["ReactSvgPiechart"] = factory(root["React"], root["PropTypes"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);



var Sector = function Sector(_ref) {
  var fill = _ref.fill,
      strokeColor = _ref.strokeColor,
      strokeLinejoin = _ref.strokeLinejoin,
      strokeWidth = _ref.strokeWidth,
      onTouchStart = _ref.onTouchStart,
      onTouchEnd = _ref.onTouchEnd,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      path = _ref.path,
      title = _ref.title,
      href = _ref.href,
      transitionDuration = _ref.transitionDuration,
      transitionTimingFunction = _ref.transitionTimingFunction;

  var result = void 0;

  var content = __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    "path",
    {
      d: path,
      fill: fill,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      strokeLinejoin: strokeLinejoin,
      onTouchStart: onTouchStart,
      onTouchEnd: onTouchEnd,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      style: {
        transitionProperty: "all",
        transitionTimingFunction: transitionTimingFunction,
        transitionDuration: transitionDuration
      }
    },
    title && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      "title",
      null,
      title
    )
  );

  if (href) {
    result = __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      "a",
      { href: href },
      content
    );
  } else {
    result = content;
  }

  return result;
};

Sector.propTypes = {
  fill: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string.isRequired,
  onMouseEnter: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onMouseLeave: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onTouchEnd: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onTouchStart: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  path: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string.isRequired,
  strokeColor: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  strokeLinejoin: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  strokeWidth: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,
  title: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  href: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  transitionDuration: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  transitionTimingFunction: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string
};

Sector.defaultProps = {
  strokeColor: "#fff",
  strokeWidth: 1,
  strokeLinejoin: "round",
  title: null,
  href: null,
  transitionDuration: "0s",
  transitionTimingFunction: "ease-out"
};

/* harmony default export */ __webpack_exports__["a"] = (Sector);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Circle__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Sectors__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Sector__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var PieChart = function (_React$Component) {
  _inherits(PieChart, _React$Component);

  function PieChart() {
    var _temp, _this, _ret;

    _classCallCheck(this, PieChart);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this), _this.state = {
      expandedIndex: null
    }, _this.handleSectorHover = function (data, index, e) {
      var _this$props = _this.props,
          expandOnHover = _this$props.expandOnHover,
          onSectorHover = _this$props.onSectorHover;


      if (expandOnHover) {
        _this.setState({ expandedIndex: index });
      }

      if (onSectorHover) {
        onSectorHover(data, index, e);
      }
    }, _this.shouldExpand = function () {
      var _this$props2 = _this.props,
          data = _this$props2.data,
          expandOnHover = _this$props2.expandOnHover;

      var oneDataIsExpanded = data.some(function (d) {
        return d.expanded;
      });
      return oneDataIsExpanded || expandOnHover;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  PieChart.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps) {
    if (nextProps.expandedIndex >= 0) {
      return {
        expandedIndex: nextProps.expandedIndex
      };
    } else {
      return null;
    }
  };

  PieChart.prototype.renderSingleData = function renderSingleData(d, center) {
    var _this2 = this;

    var expandedIndex = this.state.expandedIndex;
    var _props = this.props,
        expandOnHover = _props.expandOnHover,
        expandSize = _props.expandSize;

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Circle__["a" /* default */], _extends({
      center: center,
      radius: center + (d.expanded || expandOnHover && expandedIndex === 0 ? expandSize : 0),
      onMouseEnter: function onMouseEnter(e) {
        return _this2.handleSectorHover(d, 0, e);
      },
      onMouseLeave: function onMouseLeave(e) {
        return _this2.handleSectorHover(null, null, e);
      },
      onTouchEnd: function onTouchEnd(e) {
        return _this2.handleSectorHover(null, null, e);
      },
      onTouchStart: function onTouchStart(e) {
        return _this2.handleSectorHover(d, 0, e);
      }
    }, d));
  };

  PieChart.prototype.renderMultipleData = function renderMultipleData(center) {
    var expandedIndex = this.state.expandedIndex;

    var _props2 = this.props,
        data = _props2.data,
        expandOnHover = _props2.expandOnHover,
        props = _objectWithoutProperties(_props2, ["data", "expandOnHover"]);

    return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3__Sectors__["a" /* default */], _extends({
      center: center,
      data: expandOnHover ? data.map(function (d, i) {
        return _extends({}, d, {
          expanded: i === expandedIndex
        });
      }) : data
    }, props, {
      onSectorHover: this.handleSectorHover
    }));
  };

  PieChart.prototype.render = function render() {
    var _props3 = this.props,
        data = _props3.data,
        expandSize = _props3.expandSize,
        viewBoxSize = _props3.viewBoxSize;

    var center = viewBoxSize / 2;
    var offset = this.shouldExpand() ? expandSize : 0;
    var dataWithValue = data.filter(function (d) {
      return d.value > 0;
    });
    return dataWithValue && dataWithValue.length > 0 ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      "svg",
      {
        viewBox: "0 0 " + (viewBoxSize + offset * 2) + " " + (viewBoxSize + offset * 2)
      },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        "g",
        { transform: "translate(" + offset + ", " + offset + ")" },
        dataWithValue.length === 1 ? this.renderSingleData(dataWithValue[0], center) : this.renderMultipleData(center)
      )
    ) : null;
  };

  return PieChart;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

PieChart.propTypes = {
  data: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.shape({
    color: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string.isRequired,
    title: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string,
    value: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number.isRequired,
    href: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.string
  })).isRequired,
  expandOnHover: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.bool,
  expandSize: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  expandedIndex: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  onSectorHover: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.func,
  strokeColor: __WEBPACK_IMPORTED_MODULE_4__Sector__["a" /* default */].propTypes.strokeColor,
  strokeLinejoin: __WEBPACK_IMPORTED_MODULE_4__Sector__["a" /* default */].propTypes.strokeLinejoin,
  strokeWidth: __WEBPACK_IMPORTED_MODULE_4__Sector__["a" /* default */].propTypes.strokeWidth,
  startAngle: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  angleMargin: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  viewBoxSize: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.number,
  transitionDuration: __WEBPACK_IMPORTED_MODULE_4__Sector__["a" /* default */].propTypes.transitionDuration,
  transitionTimingFunction: __WEBPACK_IMPORTED_MODULE_4__Sector__["a" /* default */].propTypes.transitionTimingFunction
};

PieChart.defaultProps = {
  data: [],
  expandOnHover: false,
  expandSize: __WEBPACK_IMPORTED_MODULE_3__Sectors__["a" /* default */].defaultProps.expandSize,
  expandedIndex: -1,
  onSectorHover: null,
  shrinkOnTouchEnd: false,
  strokeColor: __WEBPACK_IMPORTED_MODULE_4__Sector__["a" /* default */].defaultProps.strokeColor,
  strokeLinejoin: __WEBPACK_IMPORTED_MODULE_4__Sector__["a" /* default */].defaultProps.strokeLinejoin,
  strokeWidth: __WEBPACK_IMPORTED_MODULE_4__Sector__["a" /* default */].defaultProps.strokeWidth,
  startAngle: 0,
  angleMargin: 0,
  viewBoxSize: 100,
  transitionDuration: __WEBPACK_IMPORTED_MODULE_4__Sector__["a" /* default */].defaultProps.transitionDuration,
  transitionTimingFunction: __WEBPACK_IMPORTED_MODULE_4__Sector__["a" /* default */].defaultProps.transitionTimingFunction
};

/* harmony default export */ __webpack_exports__["default"] = (PieChart);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Sector__ = __webpack_require__(2);





var Circle = function Circle(_ref) {
  var center = _ref.center,
      color = _ref.color,
      onMouseEnter = _ref.onMouseEnter,
      onMouseLeave = _ref.onMouseLeave,
      onTouchEnd = _ref.onTouchEnd,
      onTouchStart = _ref.onTouchStart,
      radius = _ref.radius,
      strokeColor = _ref.strokeColor,
      strokeWidth = _ref.strokeWidth,
      title = _ref.title;
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    "ellipse",
    {
      cx: center,
      cy: center,
      fill: color,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave,
      onTouchEnd: onTouchEnd,
      onTouchStart: onTouchStart,
      rx: radius,
      ry: radius,
      stroke: strokeColor,
      strokeWidth: strokeWidth
    },
    title && __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
      "title",
      null,
      title
    )
  );
};

Circle.propTypes = {
  onMouseEnter: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onMouseLeave: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onTouchEnd: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  onTouchStart: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  center: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number.isRequired,
  color: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string.isRequired,
  radius: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number.isRequired,
  strokeColor: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
  strokeWidth: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,
  title: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string
};

Circle.defaultProps = {
  strokeColor: __WEBPACK_IMPORTED_MODULE_2__Sector__["a" /* default */].defaultProps.strokeColor,
  strokeWidth: __WEBPACK_IMPORTED_MODULE_2__Sector__["a" /* default */].defaultProps.strokeWidth
};

/* harmony default export */ __webpack_exports__["a"] = (Circle);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Sector__ = __webpack_require__(2);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }






var Sectors = function Sectors(_ref) {
  var center = _ref.center,
      data = _ref.data,
      onSectorHover = _ref.onSectorHover,
      expandSize = _ref.expandSize,
      strokeWidth = _ref.strokeWidth,
      strokeColor = _ref.strokeColor,
      startAngle = _ref.startAngle,
      angleMargin = _ref.angleMargin,
      props = _objectWithoutProperties(_ref, ["center", "data", "onSectorHover", "expandSize", "strokeWidth", "strokeColor", "startAngle", "angleMargin"]);

  var total = data.reduce(function (prev, current) {
    return current.value + prev;
  }, 0);
  var angleStart = startAngle;
  var angleEnd = startAngle;
  return total > 0 ? __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
    "g",
    null,
    data.map(function (d, i) {
      var isLarge = d.value / total > 0.5;
      var angle = 360 * d.value / total;
      var radius = center + (d.expanded ? expandSize : 0) - strokeWidth / 2;

      angleStart = angleEnd;
      angleMargin = angleMargin > angle ? angle : angleMargin;
      angleEnd = angleStart + angle - angleMargin;

      var x1 = center + radius * Math.cos(Math.PI * angleStart / 180);
      var y1 = center + radius * Math.sin(Math.PI * angleStart / 180);
      var x2 = center + radius * Math.cos(Math.PI * angleEnd / 180);
      var y2 = center + radius * Math.sin(Math.PI * angleEnd / 180);
      var path = "\n          M" + center + "," + center + "\n          L" + x1 + "," + y1 + "\n          A" + radius + "," + radius + "\n          0 " + (isLarge ? 1 : 0) + ",1\n          " + x2 + "," + y2 + "\n          z\n        ";

      angleEnd += angleMargin;

      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__Sector__["a" /* default */], _extends({
        key: "sector" + i,
        fill: d.color,
        path: path,
        href: d.href,
        strokeColor: strokeColor,
        strokeWidth: strokeWidth,
        total: total,
        onMouseEnter: function onMouseEnter(e) {
          return onSectorHover(d, i, e);
        },
        onMouseLeave: function onMouseLeave(e) {
          return onSectorHover(null, null, e);
        },
        onTouchEnd: function onTouchEnd(e) {
          return onSectorHover(null, null, e);
        },
        onTouchStart: function onTouchStart(e) {
          return onSectorHover(d, i, e);
        }
      }, props, d));
    })
  ) : null;
};

Sectors.propTypes = {
  center: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number.isRequired,
  data: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.arrayOf(__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
    color: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string.isRequired,
    title: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.string,
    value: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number.isRequired
  })).isRequired,
  onSectorHover: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func,
  expandSize: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,
  strokeColor: __WEBPACK_IMPORTED_MODULE_2__Sector__["a" /* default */].propTypes.strokeColor,
  strokeWidth: __WEBPACK_IMPORTED_MODULE_2__Sector__["a" /* default */].propTypes.strokeWidth,
  startAngle: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number,
  angleMargin: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.number
};

Sectors.defaultProps = {
  expandSize: 5
};

/* harmony default export */ __webpack_exports__["a"] = (Sectors);

/***/ })
/******/ ])["default"];
});