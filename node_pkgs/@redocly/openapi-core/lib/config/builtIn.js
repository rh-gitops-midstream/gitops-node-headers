"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultPlugin = exports.builtInConfigs = void 0;
const recommended_1 = require("./recommended");
const all_1 = require("./all");
const minimal_1 = require("./minimal");
const oas3_1 = require("../rules/oas3");
const oas2_1 = require("../rules/oas2");
const oas3_2 = require("../rules/oas3");
const oas2_2 = require("../rules/oas2");
const oas3_3 = require("../decorators/oas3");
const oas2_3 = require("../decorators/oas2");
exports.builtInConfigs = {
    recommended: recommended_1.default,
    minimal: minimal_1.default,
    all: all_1.default,
    'redocly-registry': {
        decorators: { 'registry-dependencies': 'on' }
    }
};
exports.defaultPlugin = {
    id: '',
    rules: {
        oas3: oas3_1.rules,
        oas2: oas2_1.rules,
    },
    preprocessors: {
        oas3: oas3_2.preprocessors,
        oas2: oas2_2.preprocessors,
    },
    decorators: {
        oas3: oas3_3.decorators,
        oas2: oas2_3.decorators,
    },
    configs: exports.builtInConfigs,
};
