var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from "react";
import PropTypes from "prop-types";

import Circle from "./Circle";
import Sectors from "./Sectors";
import Sector from "./Sector";

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

    return React.createElement(Circle, _extends({
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

    return React.createElement(Sectors, _extends({
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
    return dataWithValue && dataWithValue.length > 0 ? React.createElement(
      "svg",
      {
        viewBox: "0 0 " + (viewBoxSize + offset * 2) + " " + (viewBoxSize + offset * 2)
      },
      React.createElement(
        "g",
        { transform: "translate(" + offset + ", " + offset + ")" },
        dataWithValue.length === 1 ? this.renderSingleData(dataWithValue[0], center) : this.renderMultipleData(center)
      )
    ) : null;
  };

  return PieChart;
}(React.Component);

PieChart.propTypes = process.env.NODE_ENV !== "production" ? {
  data: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    title: PropTypes.string,
    value: PropTypes.number.isRequired,
    href: PropTypes.string
  })).isRequired,
  expandOnHover: PropTypes.bool,
  expandSize: PropTypes.number,
  expandedIndex: PropTypes.number,
  onSectorHover: PropTypes.func,
  strokeColor: Sector.propTypes.strokeColor,
  strokeLinejoin: Sector.propTypes.strokeLinejoin,
  strokeWidth: Sector.propTypes.strokeWidth,
  startAngle: PropTypes.number,
  angleMargin: PropTypes.number,
  viewBoxSize: PropTypes.number,
  transitionDuration: Sector.propTypes.transitionDuration,
  transitionTimingFunction: Sector.propTypes.transitionTimingFunction
} : {};

PieChart.defaultProps = {
  data: [],
  expandOnHover: false,
  expandSize: Sectors.defaultProps.expandSize,
  expandedIndex: -1,
  onSectorHover: null,
  shrinkOnTouchEnd: false,
  strokeColor: Sector.defaultProps.strokeColor,
  strokeLinejoin: Sector.defaultProps.strokeLinejoin,
  strokeWidth: Sector.defaultProps.strokeWidth,
  startAngle: 0,
  angleMargin: 0,
  viewBoxSize: 100,
  transitionDuration: Sector.defaultProps.transitionDuration,
  transitionTimingFunction: Sector.defaultProps.transitionTimingFunction
};

export default PieChart;