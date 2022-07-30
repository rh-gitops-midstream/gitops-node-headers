"use strict";

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Sector = require("../Sector");

var _Sector2 = _interopRequireDefault(_Sector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return total > 0 ? _react2.default.createElement(
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

      return _react2.default.createElement(_Sector2.default, _extends({
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

Sectors.propTypes = process.env.NODE_ENV !== "production" ? {
  center: _propTypes2.default.number.isRequired,
  data: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    color: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    value: _propTypes2.default.number.isRequired
  })).isRequired,
  onSectorHover: _propTypes2.default.func,
  expandSize: _propTypes2.default.number,
  strokeColor: _Sector2.default.propTypes.strokeColor,
  strokeWidth: _Sector2.default.propTypes.strokeWidth,
  startAngle: _propTypes2.default.number,
  angleMargin: _propTypes2.default.number
} : {};

Sectors.defaultProps = {
  expandSize: 5
};

exports.default = Sectors;
module.exports = exports["default"];