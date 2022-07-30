"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Circle = require("./Circle");

var _Circle2 = _interopRequireDefault(_Circle);

var _Sectors = require("./Sectors");

var _Sectors2 = _interopRequireDefault(_Sectors);

var _Sector = require("./Sector");

var _Sector2 = _interopRequireDefault(_Sector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    return _react2.default.createElement(_Circle2.default, _extends({
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

    return _react2.default.createElement(_Sectors2.default, _extends({
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
    return dataWithValue && dataWithValue.length > 0 ? _react2.default.createElement(
      "svg",
      {
        viewBox: "0 0 " + (viewBoxSize + offset * 2) + " " + (viewBoxSize + offset * 2)
      },
      _react2.default.createElement(
        "g",
        { transform: "translate(" + offset + ", " + offset + ")" },
        dataWithValue.length === 1 ? this.renderSingleData(dataWithValue[0], center) : this.renderMultipleData(center)
      )
    ) : null;
  };

  return PieChart;
}(_react2.default.Component);

PieChart.propTypes = process.env.NODE_ENV !== "production" ? {
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    color: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    value: _propTypes2.default.number.isRequired,
    href: _propTypes2.default.string
  })).isRequired,
  expandOnHover: _propTypes2.default.bool,
  expandSize: _propTypes2.default.number,
  expandedIndex: _propTypes2.default.number,
  onSectorHover: _propTypes2.default.func,
  strokeColor: _Sector2.default.propTypes.strokeColor,
  strokeLinejoin: _Sector2.default.propTypes.strokeLinejoin,
  strokeWidth: _Sector2.default.propTypes.strokeWidth,
  startAngle: _propTypes2.default.number,
  angleMargin: _propTypes2.default.number,
  viewBoxSize: _propTypes2.default.number,
  transitionDuration: _Sector2.default.propTypes.transitionDuration,
  transitionTimingFunction: _Sector2.default.propTypes.transitionTimingFunction
} : {};

PieChart.defaultProps = {
  data: [],
  expandOnHover: false,
  expandSize: _Sectors2.default.defaultProps.expandSize,
  expandedIndex: -1,
  onSectorHover: null,
  shrinkOnTouchEnd: false,
  strokeColor: _Sector2.default.defaultProps.strokeColor,
  strokeLinejoin: _Sector2.default.defaultProps.strokeLinejoin,
  strokeWidth: _Sector2.default.defaultProps.strokeWidth,
  startAngle: 0,
  angleMargin: 0,
  viewBoxSize: 100,
  transitionDuration: _Sector2.default.defaultProps.transitionDuration,
  transitionTimingFunction: _Sector2.default.defaultProps.transitionTimingFunction
};

exports.default = PieChart;
module.exports = exports["default"];