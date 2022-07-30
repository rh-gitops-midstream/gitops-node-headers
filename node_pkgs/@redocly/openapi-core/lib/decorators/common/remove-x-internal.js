"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveXInternal = void 0;
const utils_1 = require("../../utils");
const ref_utils_1 = require("../../ref-utils");
const DEFAULT_INTERNAL_PROPERTY_NAME = 'x-internal';
const RemoveXInternal = ({ internalFlagProperty }) => {
    const hiddenTag = internalFlagProperty || DEFAULT_INTERNAL_PROPERTY_NAME;
    function removeInternal(node, ctx) {
        var _a, _b, _c, _d;
        const { parent, key } = ctx;
        let didDelete = false;
        if (Array.isArray(node)) {
            for (let i = 0; i < node.length; i++) {
                if (ref_utils_1.isRef(node[i])) {
                    const resolved = ctx.resolve(node[i]);
                    if ((_a = resolved.node) === null || _a === void 0 ? void 0 : _a[hiddenTag]) {
                        node.splice(i, 1);
                        didDelete = true;
                        i--;
                    }
                }
                if ((_b = node[i]) === null || _b === void 0 ? void 0 : _b[hiddenTag]) {
                    node.splice(i, 1);
                    didDelete = true;
                    i--;
                }
            }
        }
        else if (utils_1.isPlainObject(node)) {
            for (const key of Object.keys(node)) {
                node = node;
                if (ref_utils_1.isRef(node[key])) {
                    const resolved = ctx.resolve(node[key]);
                    if ((_c = resolved.node) === null || _c === void 0 ? void 0 : _c[hiddenTag]) {
                        delete node[key];
                        didDelete = true;
                    }
                }
                if ((_d = node[key]) === null || _d === void 0 ? void 0 : _d[hiddenTag]) {
                    delete node[key];
                    didDelete = true;
                }
            }
        }
        if (didDelete && (utils_1.isEmptyObject(node) || utils_1.isEmptyArray(node))) {
            delete parent[key];
        }
    }
    return {
        any: {
            enter: (node, ctx) => {
                removeInternal(node, ctx);
            }
        }
    };
};
exports.RemoveXInternal = RemoveXInternal;
