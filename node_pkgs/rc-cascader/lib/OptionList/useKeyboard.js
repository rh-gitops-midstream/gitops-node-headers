"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var React = _interopRequireWildcard(require("react"));

var _KeyCode = _interopRequireDefault(require("rc-util/lib/KeyCode"));

var _commonUtil = require("../utils/commonUtil");

var _rcSelect = require("rc-select");

var _default = function _default(ref, options, fieldNames, activeValueCells, setActiveValueCells, containerRef, onKeyBoardSelect) {
  var _useBaseProps = (0, _rcSelect.useBaseProps)(),
      direction = _useBaseProps.direction,
      searchValue = _useBaseProps.searchValue,
      toggleOpen = _useBaseProps.toggleOpen,
      open = _useBaseProps.open;

  var rtl = direction === 'rtl';

  var _React$useMemo = React.useMemo(function () {
    var activeIndex = -1;
    var currentOptions = options;
    var mergedActiveIndexes = [];
    var mergedActiveValueCells = [];
    var len = activeValueCells.length; // Fill validate active value cells and index

    var _loop = function _loop(i) {
      // Mark the active index for current options
      var nextActiveIndex = currentOptions.findIndex(function (option) {
        return option[fieldNames.value] === activeValueCells[i];
      });

      if (nextActiveIndex === -1) {
        return "break";
      }

      activeIndex = nextActiveIndex;
      mergedActiveIndexes.push(activeIndex);
      mergedActiveValueCells.push(activeValueCells[i]);
      currentOptions = currentOptions[activeIndex][fieldNames.children];
    };

    // Fill validate active value cells and index
    for (var i = 0; i < len; i += 1) {
      var _ret = _loop(i);

      if (_ret === "break") break;
    } // Fill last active options


    // Fill last active options
    var activeOptions = options;

    for (var _i = 0; _i < mergedActiveIndexes.length - 1; _i += 1) {
      activeOptions = activeOptions[mergedActiveIndexes[_i]][fieldNames.children];
    }

    return [mergedActiveValueCells, activeIndex, activeOptions];
  }, [activeValueCells, fieldNames, options]),
      _React$useMemo2 = (0, _slicedToArray2.default)(_React$useMemo, 3),
      validActiveValueCells = _React$useMemo2[0],
      lastActiveIndex = _React$useMemo2[1],
      lastActiveOptions = _React$useMemo2[2]; // Update active value cells and scroll to target element


  var internalSetActiveValueCells = function internalSetActiveValueCells(next) {
    var _containerRef$current, _ele$scrollIntoView;

    setActiveValueCells(next);
    var ele = (_containerRef$current = containerRef.current) === null || _containerRef$current === void 0 ? void 0 : _containerRef$current.querySelector("li[data-path-key=\"".concat((0, _commonUtil.toPathKey)(next), "\"]"));
    ele === null || ele === void 0 ? void 0 : (_ele$scrollIntoView = ele.scrollIntoView) === null || _ele$scrollIntoView === void 0 ? void 0 : _ele$scrollIntoView.call(ele, {
      block: 'nearest'
    });
  }; // Same options offset


  var offsetActiveOption = function offsetActiveOption(offset) {
    var len = lastActiveOptions.length;
    var currentIndex = lastActiveIndex;

    if (currentIndex === -1 && offset < 0) {
      currentIndex = len;
    }

    for (var i = 0; i < len; i += 1) {
      currentIndex = (currentIndex + offset + len) % len;
      var option = lastActiveOptions[currentIndex];

      if (option && !option.disabled) {
        var value = option[fieldNames.value];
        var nextActiveCells = validActiveValueCells.slice(0, -1).concat(value);
        internalSetActiveValueCells(nextActiveCells);
        return;
      }
    }
  }; // Different options offset


  var prevColumn = function prevColumn() {
    if (validActiveValueCells.length > 1) {
      var nextActiveCells = validActiveValueCells.slice(0, -1);
      internalSetActiveValueCells(nextActiveCells);
    } else {
      toggleOpen(false);
    }
  };

  var nextColumn = function nextColumn() {
    var _lastActiveOptions$la;

    var nextOptions = ((_lastActiveOptions$la = lastActiveOptions[lastActiveIndex]) === null || _lastActiveOptions$la === void 0 ? void 0 : _lastActiveOptions$la[fieldNames.children]) || [];
    var nextOption = nextOptions.find(function (option) {
      return !option.disabled;
    });

    if (nextOption) {
      var nextActiveCells = [].concat((0, _toConsumableArray2.default)(validActiveValueCells), [nextOption[fieldNames.value]]);
      internalSetActiveValueCells(nextActiveCells);
    }
  };

  React.useImperativeHandle(ref, function () {
    return {
      // scrollTo: treeRef.current?.scrollTo,
      onKeyDown: function onKeyDown(event) {
        var which = event.which;

        switch (which) {
          // >>> Arrow keys
          case _KeyCode.default.UP:
          case _KeyCode.default.DOWN:
            {
              var offset = 0;

              if (which === _KeyCode.default.UP) {
                offset = -1;
              } else if (which === _KeyCode.default.DOWN) {
                offset = 1;
              }

              if (offset !== 0) {
                offsetActiveOption(offset);
              }

              break;
            }

          case _KeyCode.default.LEFT:
            {
              if (rtl) {
                nextColumn();
              } else {
                prevColumn();
              }

              break;
            }

          case _KeyCode.default.RIGHT:
            {
              if (rtl) {
                prevColumn();
              } else {
                nextColumn();
              }

              break;
            }

          case _KeyCode.default.BACKSPACE:
            {
              if (!searchValue) {
                prevColumn();
              }

              break;
            }
          // >>> Select

          case _KeyCode.default.ENTER:
            {
              if (validActiveValueCells.length) {
                onKeyBoardSelect(validActiveValueCells, lastActiveOptions[lastActiveIndex]);
              }

              break;
            }
          // >>> Close

          case _KeyCode.default.ESC:
            {
              toggleOpen(false);

              if (open) {
                event.stopPropagation();
              }
            }
        }
      },
      onKeyUp: function onKeyUp() {}
    };
  });
};

exports.default = _default;