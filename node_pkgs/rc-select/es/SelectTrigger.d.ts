import * as React from 'react';
import type { Placement, RenderDOMFunc } from './BaseSelect';
export interface RefTriggerProps {
    getPopupElement: () => HTMLDivElement;
}
export interface SelectTriggerProps {
    prefixCls: string;
    children: React.ReactElement;
    disabled: boolean;
    visible: boolean;
    popupElement: React.ReactElement;
    animation?: string;
    transitionName?: string;
    containerWidth: number;
    placement?: Placement;
    dropdownStyle: React.CSSProperties;
    dropdownClassName: string;
    direction: string;
    dropdownMatchSelectWidth?: boolean | number;
    dropdownRender?: (menu: React.ReactElement) => React.ReactElement;
    getPopupContainer?: RenderDOMFunc;
    dropdownAlign: object;
    empty: boolean;
    autoAdjustOverflow?: boolean;
    getTriggerDOMNode: () => HTMLElement;
    onPopupVisibleChange?: (visible: boolean) => void;
    onPopupMouseEnter: () => void;
}
declare const RefSelectTrigger: React.ForwardRefExoticComponent<SelectTriggerProps & React.RefAttributes<RefTriggerProps>>;
export default RefSelectTrigger;
