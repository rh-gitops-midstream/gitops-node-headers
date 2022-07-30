"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTransitionDuration = exports.defaultProps = void 0;

var _react = require("react");

var defaultProps = {
  className: '',
  percent: 0,
  prefixCls: 'rc-progress',
  strokeColor: '#2db7f5',
  strokeLinecap: 'round',
  strokeWidth: 1,
  style: {},
  trailColor: '#D9D9D9',
  trailWidth: 1
};
exports.defaultProps = defaultProps;

var useTransitionDuration = function useTransitionDuration(percentList) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  var paths = percentList.map(function () {
    return (0, _react.useRef)();
  });
  var prevTimeStamp = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var now = Date.now();
    var updated = false;
    Object.keys(paths).forEach(function (key) {
      var path = paths[key].current;

      if (!path) {
        return;
      }

      updated = true;
      var pathStyle = path.style;
      pathStyle.transitionDuration = '.3s, .3s, .3s, .06s';

      if (prevTimeStamp.current && now - prevTimeStamp.current < 100) {
        pathStyle.transitionDuration = '0s, 0s';
      }
    });

    if (updated) {
      prevTimeStamp.current = Date.now();
    }
  });
  return [paths];
};

exports.useTransitionDuration = useTransitionDuration;