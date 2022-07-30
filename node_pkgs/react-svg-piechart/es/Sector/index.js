import PropTypes from "prop-types";
import React from "react";

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

  var content = React.createElement(
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
    title && React.createElement(
      "title",
      null,
      title
    )
  );

  if (href) {
    result = React.createElement(
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
  fill: PropTypes.string.isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onTouchEnd: PropTypes.func,
  onTouchStart: PropTypes.func,
  path: PropTypes.string.isRequired,
  strokeColor: PropTypes.string,
  strokeLinejoin: PropTypes.string,
  strokeWidth: PropTypes.number,
  title: PropTypes.string,
  href: PropTypes.string,
  transitionDuration: PropTypes.string,
  transitionTimingFunction: PropTypes.string
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

export default Sector;