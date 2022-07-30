"use strict";

exports.__esModule = true;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  var content = _react2.default.createElement(
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
    title && _react2.default.createElement(
      "title",
      null,
      title
    )
  );

  if (href) {
    result = _react2.default.createElement(
      "a",
      { href: href },
      content
    );
  } else {
    result = content;
  }

  return result;
};

Sector.propTypes = process.env.NODE_ENV !== "production" ? {
  fill: _propTypes2.default.string.isRequired,
  onMouseEnter: _propTypes2.default.func,
  onMouseLeave: _propTypes2.default.func,
  onTouchEnd: _propTypes2.default.func,
  onTouchStart: _propTypes2.default.func,
  path: _propTypes2.default.string.isRequired,
  strokeColor: _propTypes2.default.string,
  strokeLinejoin: _propTypes2.default.string,
  strokeWidth: _propTypes2.default.number,
  title: _propTypes2.default.string,
  href: _propTypes2.default.string,
  transitionDuration: _propTypes2.default.string,
  transitionTimingFunction: _propTypes2.default.string
} : {};

Sector.defaultProps = {
  strokeColor: "#fff",
  strokeWidth: 1,
  strokeLinejoin: "round",
  title: null,
  href: null,
  transitionDuration: "0s",
  transitionTimingFunction: "ease-out"
};

exports.default = Sector;
module.exports = exports["default"];