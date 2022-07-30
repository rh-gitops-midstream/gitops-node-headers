import _extends from "@babel/runtime/helpers/esm/extends";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/esm/typeof";
var _excluded = ["id", "prefixCls", "value", "defaultValue", "onChange", "onSelect", "onDeselect", "searchValue", "inputValue", "onSearch", "autoClearSearchValue", "filterTreeNode", "treeNodeFilterProp", "showCheckedStrategy", "treeNodeLabelProp", "multiple", "treeCheckable", "treeCheckStrictly", "labelInValue", "fieldNames", "treeDataSimpleMode", "treeData", "children", "loadData", "treeLoadedKeys", "onTreeLoad", "treeDefaultExpandAll", "treeExpandedKeys", "treeDefaultExpandedKeys", "onTreeExpand", "virtual", "listHeight", "listItemHeight", "onDropdownVisibleChange", "treeLine", "treeIcon", "showTreeIcon", "switcherIcon", "treeMotion"];
import * as React from 'react';
import { BaseSelect } from 'rc-select';
import { conductCheck } from "rc-tree/es/utils/conductUtil";
import useId from "rc-select/es/hooks/useId";
import useMergedState from "rc-util/es/hooks/useMergedState";
import OptionList from './OptionList';
import TreeNode from './TreeNode';
import { formatStrategyValues, SHOW_ALL, SHOW_PARENT, SHOW_CHILD } from './utils/strategyUtil';
import TreeSelectContext from './TreeSelectContext';
import LegacyContext from './LegacyContext';
import useTreeData from './hooks/useTreeData';
import { toArray, fillFieldNames, isNil } from './utils/valueUtil';
import useCache from './hooks/useCache';
import useRefFunc from './hooks/useRefFunc';
import useDataEntities from './hooks/useDataEntities';
import { fillAdditionalInfo, fillLegacyProps } from './utils/legacyUtil';
import useCheckedKeys from './hooks/useCheckedKeys';
import useFilterTreeData from './hooks/useFilterTreeData';
import warningProps from './utils/warningPropsUtil';
import warning from "rc-util/es/warning";

function isRawValue(value) {
  return !value || _typeof(value) !== 'object';
}

var TreeSelect = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var id = props.id,
      _props$prefixCls = props.prefixCls,
      prefixCls = _props$prefixCls === void 0 ? 'rc-tree-select' : _props$prefixCls,
      value = props.value,
      defaultValue = props.defaultValue,
      onChange = props.onChange,
      onSelect = props.onSelect,
      onDeselect = props.onDeselect,
      searchValue = props.searchValue,
      inputValue = props.inputValue,
      onSearch = props.onSearch,
      _props$autoClearSearc = props.autoClearSearchValue,
      autoClearSearchValue = _props$autoClearSearc === void 0 ? true : _props$autoClearSearc,
      filterTreeNode = props.filterTreeNode,
      _props$treeNodeFilter = props.treeNodeFilterProp,
      treeNodeFilterProp = _props$treeNodeFilter === void 0 ? 'value' : _props$treeNodeFilter,
      _props$showCheckedStr = props.showCheckedStrategy,
      showCheckedStrategy = _props$showCheckedStr === void 0 ? SHOW_CHILD : _props$showCheckedStr,
      treeNodeLabelProp = props.treeNodeLabelProp,
      multiple = props.multiple,
      treeCheckable = props.treeCheckable,
      treeCheckStrictly = props.treeCheckStrictly,
      labelInValue = props.labelInValue,
      fieldNames = props.fieldNames,
      treeDataSimpleMode = props.treeDataSimpleMode,
      treeData = props.treeData,
      children = props.children,
      loadData = props.loadData,
      treeLoadedKeys = props.treeLoadedKeys,
      onTreeLoad = props.onTreeLoad,
      treeDefaultExpandAll = props.treeDefaultExpandAll,
      treeExpandedKeys = props.treeExpandedKeys,
      treeDefaultExpandedKeys = props.treeDefaultExpandedKeys,
      onTreeExpand = props.onTreeExpand,
      virtual = props.virtual,
      _props$listHeight = props.listHeight,
      listHeight = _props$listHeight === void 0 ? 200 : _props$listHeight,
      _props$listItemHeight = props.listItemHeight,
      listItemHeight = _props$listItemHeight === void 0 ? 20 : _props$listItemHeight,
      onDropdownVisibleChange = props.onDropdownVisibleChange,
      treeLine = props.treeLine,
      treeIcon = props.treeIcon,
      showTreeIcon = props.showTreeIcon,
      switcherIcon = props.switcherIcon,
      treeMotion = props.treeMotion,
      restProps = _objectWithoutProperties(props, _excluded);

  var mergedId = useId(id);
  var treeConduction = treeCheckable && !treeCheckStrictly;
  var mergedCheckable = treeCheckable || treeCheckStrictly;
  var mergedLabelInValue = treeCheckStrictly || labelInValue;
  var mergedMultiple = mergedCheckable || multiple; // ========================== Warning ===========================

  if (process.env.NODE_ENV !== 'production') {
    warningProps(props);
  } // ========================= FieldNames =========================


  var mergedFieldNames = React.useMemo(function () {
    return fillFieldNames(fieldNames);
  },
  /* eslint-disable react-hooks/exhaustive-deps */
  [JSON.stringify(fieldNames)]); // =========================== Search ===========================

  var _useMergedState = useMergedState('', {
    value: searchValue !== undefined ? searchValue : inputValue,
    postState: function postState(search) {
      return search || '';
    }
  }),
      _useMergedState2 = _slicedToArray(_useMergedState, 2),
      mergedSearchValue = _useMergedState2[0],
      setSearchValue = _useMergedState2[1];

  var onInternalSearch = function onInternalSearch(searchText) {
    setSearchValue(searchText);
    onSearch === null || onSearch === void 0 ? void 0 : onSearch(searchText);
  }; // ============================ Data ============================
  // `useTreeData` only do convert of `children` or `simpleMode`.
  // Else will return origin `treeData` for perf consideration.
  // Do not do anything to loop the data.


  var mergedTreeData = useTreeData(treeData, children, treeDataSimpleMode);

  var _useDataEntities = useDataEntities(mergedTreeData, mergedFieldNames),
      keyEntities = _useDataEntities.keyEntities,
      valueEntities = _useDataEntities.valueEntities;
  /** Get `missingRawValues` which not exist in the tree yet */


  var splitRawValues = React.useCallback(function (newRawValues) {
    var missingRawValues = [];
    var existRawValues = []; // Keep missing value in the cache

    newRawValues.forEach(function (val) {
      if (valueEntities.has(val)) {
        existRawValues.push(val);
      } else {
        missingRawValues.push(val);
      }
    });
    return {
      missingRawValues: missingRawValues,
      existRawValues: existRawValues
    };
  }, [valueEntities]); // Filtered Tree

  var filteredTreeData = useFilterTreeData(mergedTreeData, mergedSearchValue, {
    fieldNames: mergedFieldNames,
    treeNodeFilterProp: treeNodeFilterProp,
    filterTreeNode: filterTreeNode
  }); // =========================== Label ============================

  var getLabel = React.useCallback(function (item) {
    if (item) {
      if (treeNodeLabelProp) {
        return item[treeNodeLabelProp];
      } // Loop from fieldNames


      var titleList = mergedFieldNames._title;

      for (var i = 0; i < titleList.length; i += 1) {
        var title = item[titleList[i]];

        if (title !== undefined) {
          return title;
        }
      }
    }
  }, [mergedFieldNames, treeNodeLabelProp]); // ========================= Wrap Value =========================

  var toLabeledValues = React.useCallback(function (draftValues) {
    var values = toArray(draftValues);
    return values.map(function (val) {
      if (isRawValue(val)) {
        return {
          value: val
        };
      }

      return val;
    });
  }, []);
  var convert2LabelValues = React.useCallback(function (draftValues) {
    var values = toLabeledValues(draftValues);
    return values.map(function (item) {
      var rawLabel = item.label;
      var rawValue = item.value,
          rawHalfChecked = item.halfChecked;
      var rawDisabled;
      var entity = valueEntities.get(rawValue); // Fill missing label & status

      if (entity) {
        var _rawLabel;

        rawLabel = (_rawLabel = rawLabel) !== null && _rawLabel !== void 0 ? _rawLabel : getLabel(entity.node);
        rawDisabled = entity.node.disabled;
      }

      return {
        label: rawLabel,
        value: rawValue,
        halfChecked: rawHalfChecked,
        disabled: rawDisabled
      };
    });
  }, [valueEntities, getLabel, toLabeledValues]); // =========================== Values ===========================

  var _useMergedState3 = useMergedState(defaultValue, {
    value: value
  }),
      _useMergedState4 = _slicedToArray(_useMergedState3, 2),
      internalValue = _useMergedState4[0],
      setInternalValue = _useMergedState4[1];

  var rawMixedLabeledValues = React.useMemo(function () {
    return toLabeledValues(internalValue);
  }, [toLabeledValues, internalValue]); // Split value into full check and half check

  var _React$useMemo = React.useMemo(function () {
    var fullCheckValues = [];
    var halfCheckValues = [];
    rawMixedLabeledValues.forEach(function (item) {
      if (item.halfChecked) {
        halfCheckValues.push(item);
      } else {
        fullCheckValues.push(item);
      }
    });
    return [fullCheckValues, halfCheckValues];
  }, [rawMixedLabeledValues]),
      _React$useMemo2 = _slicedToArray(_React$useMemo, 2),
      rawLabeledValues = _React$useMemo2[0],
      rawHalfLabeledValues = _React$useMemo2[1]; // const [mergedValues] = useCache(rawLabeledValues);


  var rawValues = React.useMemo(function () {
    return rawLabeledValues.map(function (item) {
      return item.value;
    });
  }, [rawLabeledValues]); // Convert value to key. Will fill missed keys for conduct check.

  var _useCheckedKeys = useCheckedKeys(rawLabeledValues, rawHalfLabeledValues, treeConduction, keyEntities),
      _useCheckedKeys2 = _slicedToArray(_useCheckedKeys, 2),
      rawCheckedValues = _useCheckedKeys2[0],
      rawHalfCheckedValues = _useCheckedKeys2[1]; // Convert rawCheckedKeys to check strategy related values


  var displayValues = React.useMemo(function () {
    // Collect keys which need to show
    var displayKeys = formatStrategyValues(rawCheckedValues, showCheckedStrategy, keyEntities, mergedFieldNames); // Convert to value and filled with label

    var values = displayKeys.map(function (key) {
      var _keyEntities$key$node, _keyEntities$key, _keyEntities$key$node2;

      return (_keyEntities$key$node = (_keyEntities$key = keyEntities[key]) === null || _keyEntities$key === void 0 ? void 0 : (_keyEntities$key$node2 = _keyEntities$key.node) === null || _keyEntities$key$node2 === void 0 ? void 0 : _keyEntities$key$node2[mergedFieldNames.value]) !== null && _keyEntities$key$node !== void 0 ? _keyEntities$key$node : key;
    });
    var rawDisplayValues = convert2LabelValues(values);
    var firstVal = rawDisplayValues[0];

    if (!mergedMultiple && firstVal && isNil(firstVal.value) && isNil(firstVal.label)) {
      return [];
    }

    return rawDisplayValues.map(function (item) {
      var _item$label;

      return _objectSpread(_objectSpread({}, item), {}, {
        label: (_item$label = item.label) !== null && _item$label !== void 0 ? _item$label : item.value
      });
    });
  }, [mergedFieldNames, mergedMultiple, rawCheckedValues, convert2LabelValues, showCheckedStrategy, keyEntities]);

  var _useCache = useCache(displayValues),
      _useCache2 = _slicedToArray(_useCache, 1),
      cachedDisplayValues = _useCache2[0]; // =========================== Change ===========================


  var triggerChange = useRefFunc(function (newRawValues, extra, source) {
    var labeledValues = convert2LabelValues(newRawValues);
    setInternalValue(labeledValues); // Clean up if needed

    if (autoClearSearchValue) {
      setSearchValue('');
    } // Generate rest parameters is costly, so only do it when necessary


    if (onChange) {
      var eventValues = newRawValues;

      if (treeConduction) {
        var formattedKeyList = formatStrategyValues(newRawValues, showCheckedStrategy, keyEntities, mergedFieldNames);
        eventValues = formattedKeyList.map(function (key) {
          var entity = valueEntities.get(key);
          return entity ? entity.node[mergedFieldNames.value] : key;
        });
      }

      var _ref = extra || {
        triggerValue: undefined,
        selected: undefined
      },
          triggerValue = _ref.triggerValue,
          selected = _ref.selected;

      var returnRawValues = eventValues; // We need fill half check back

      if (treeCheckStrictly) {
        var halfValues = rawHalfLabeledValues.filter(function (item) {
          return !eventValues.includes(item.value);
        });
        returnRawValues = [].concat(_toConsumableArray(returnRawValues), _toConsumableArray(halfValues));
      }

      var returnLabeledValues = convert2LabelValues(returnRawValues);
      var additionalInfo = {
        // [Legacy] Always return as array contains label & value
        preValue: rawLabeledValues,
        triggerValue: triggerValue
      }; // [Legacy] Fill legacy data if user query.
      // This is expansive that we only fill when user query
      // https://github.com/react-component/tree-select/blob/fe33eb7c27830c9ac70cd1fdb1ebbe7bc679c16a/src/Select.jsx

      var showPosition = true;

      if (treeCheckStrictly || source === 'selection' && !selected) {
        showPosition = false;
      }

      fillAdditionalInfo(additionalInfo, triggerValue, newRawValues, mergedTreeData, showPosition, mergedFieldNames);

      if (mergedCheckable) {
        additionalInfo.checked = selected;
      } else {
        additionalInfo.selected = selected;
      }

      var returnValues = mergedLabelInValue ? returnLabeledValues : returnLabeledValues.map(function (item) {
        return item.value;
      });
      onChange(mergedMultiple ? returnValues : returnValues[0], mergedLabelInValue ? null : returnLabeledValues.map(function (item) {
        return item.label;
      }), additionalInfo);
    }
  }); // ========================== Options ===========================

  /** Trigger by option list */

  var onOptionSelect = React.useCallback(function (selectedKey, _ref2) {
    var _node$mergedFieldName;

    var selected = _ref2.selected,
        source = _ref2.source;
    var entity = keyEntities[selectedKey];
    var node = entity === null || entity === void 0 ? void 0 : entity.node;
    var selectedValue = (_node$mergedFieldName = node === null || node === void 0 ? void 0 : node[mergedFieldNames.value]) !== null && _node$mergedFieldName !== void 0 ? _node$mergedFieldName : selectedKey; // Never be falsy but keep it safe

    if (!mergedMultiple) {
      // Single mode always set value
      triggerChange([selectedValue], {
        selected: true,
        triggerValue: selectedValue
      }, 'option');
    } else {
      var newRawValues = selected ? [].concat(_toConsumableArray(rawValues), [selectedValue]) : rawCheckedValues.filter(function (v) {
        return v !== selectedValue;
      }); // Add keys if tree conduction

      if (treeConduction) {
        // Should keep missing values
        var _splitRawValues = splitRawValues(newRawValues),
            missingRawValues = _splitRawValues.missingRawValues,
            existRawValues = _splitRawValues.existRawValues;

        var keyList = existRawValues.map(function (val) {
          return valueEntities.get(val).key;
        }); // Conduction by selected or not

        var checkedKeys;

        if (selected) {
          var _conductCheck = conductCheck(keyList, true, keyEntities);

          checkedKeys = _conductCheck.checkedKeys;
        } else {
          var _conductCheck2 = conductCheck(keyList, {
            checked: false,
            halfCheckedKeys: rawHalfCheckedValues
          }, keyEntities);

          checkedKeys = _conductCheck2.checkedKeys;
        } // Fill back of keys


        newRawValues = [].concat(_toConsumableArray(missingRawValues), _toConsumableArray(checkedKeys.map(function (key) {
          return keyEntities[key].node[mergedFieldNames.value];
        })));
      }

      triggerChange(newRawValues, {
        selected: selected,
        triggerValue: selectedValue
      }, source || 'option');
    } // Trigger select event


    if (selected || !mergedMultiple) {
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(selectedValue, fillLegacyProps(node));
    } else {
      onDeselect === null || onDeselect === void 0 ? void 0 : onDeselect(selectedValue, fillLegacyProps(node));
    }
  }, [splitRawValues, valueEntities, keyEntities, mergedFieldNames, mergedMultiple, rawValues, triggerChange, treeConduction, onSelect, onDeselect, rawCheckedValues, rawHalfCheckedValues]); // ========================== Dropdown ==========================

  var onInternalDropdownVisibleChange = React.useCallback(function (open) {
    if (onDropdownVisibleChange) {
      var legacyParam = {};
      Object.defineProperty(legacyParam, 'documentClickClose', {
        get: function get() {
          warning(false, 'Second param of `onDropdownVisibleChange` has been removed.');
          return false;
        }
      });
      onDropdownVisibleChange(open, legacyParam);
    }
  }, [onDropdownVisibleChange]); // ====================== Display Change ========================

  var onDisplayValuesChange = useRefFunc(function (newValues, info) {
    var newRawValues = newValues.map(function (item) {
      return item.value;
    });

    if (info.type === 'clear') {
      triggerChange(newRawValues, {}, 'selection');
      return;
    } // TreeSelect only have multiple mode which means display change only has remove


    if (info.values.length) {
      onOptionSelect(info.values[0].value, {
        selected: false,
        source: 'selection'
      });
    }
  }); // ========================== Context ===========================

  var treeSelectContext = React.useMemo(function () {
    return {
      virtual: virtual,
      listHeight: listHeight,
      listItemHeight: listItemHeight,
      treeData: filteredTreeData,
      fieldNames: mergedFieldNames,
      onSelect: onOptionSelect
    };
  }, [virtual, listHeight, listItemHeight, filteredTreeData, mergedFieldNames, onOptionSelect]); // ======================= Legacy Context =======================

  var legacyContext = React.useMemo(function () {
    return {
      checkable: mergedCheckable,
      loadData: loadData,
      treeLoadedKeys: treeLoadedKeys,
      onTreeLoad: onTreeLoad,
      checkedKeys: rawCheckedValues,
      halfCheckedKeys: rawHalfCheckedValues,
      treeDefaultExpandAll: treeDefaultExpandAll,
      treeExpandedKeys: treeExpandedKeys,
      treeDefaultExpandedKeys: treeDefaultExpandedKeys,
      onTreeExpand: onTreeExpand,
      treeIcon: treeIcon,
      treeMotion: treeMotion,
      showTreeIcon: showTreeIcon,
      switcherIcon: switcherIcon,
      treeLine: treeLine,
      treeNodeFilterProp: treeNodeFilterProp,
      keyEntities: keyEntities
    };
  }, [mergedCheckable, loadData, treeLoadedKeys, onTreeLoad, rawCheckedValues, rawHalfCheckedValues, treeDefaultExpandAll, treeExpandedKeys, treeDefaultExpandedKeys, onTreeExpand, treeIcon, treeMotion, showTreeIcon, switcherIcon, treeLine, treeNodeFilterProp, keyEntities]); // =========================== Render ===========================

  return /*#__PURE__*/React.createElement(TreeSelectContext.Provider, {
    value: treeSelectContext
  }, /*#__PURE__*/React.createElement(LegacyContext.Provider, {
    value: legacyContext
  }, /*#__PURE__*/React.createElement(BaseSelect, _extends({
    ref: ref
  }, restProps, {
    // >>> MISC
    id: mergedId,
    prefixCls: prefixCls,
    mode: mergedMultiple ? 'multiple' : undefined // >>> Display Value
    ,
    displayValues: cachedDisplayValues,
    onDisplayValuesChange: onDisplayValuesChange // >>> Search
    ,
    searchValue: mergedSearchValue,
    onSearch: onInternalSearch // >>> Options
    ,
    OptionList: OptionList,
    emptyOptions: !mergedTreeData.length,
    onDropdownVisibleChange: onInternalDropdownVisibleChange
  }))));
}); // Assign name for Debug

if (process.env.NODE_ENV !== 'production') {
  TreeSelect.displayName = 'TreeSelect';
}

var GenericTreeSelect = TreeSelect;
GenericTreeSelect.TreeNode = TreeNode;
GenericTreeSelect.SHOW_ALL = SHOW_ALL;
GenericTreeSelect.SHOW_PARENT = SHOW_PARENT;
GenericTreeSelect.SHOW_CHILD = SHOW_CHILD;
export default GenericTreeSelect;