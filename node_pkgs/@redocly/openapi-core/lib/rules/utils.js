"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateExample = exports.getSuggest = exports.validateDefinedAndNonEmpty = exports.fieldNonEmpty = exports.missingRequiredField = exports.matchesJsonSchemaType = exports.oasTypeOf = void 0;
const levenshtein = require("js-levenshtein");
const ref_utils_1 = require("../ref-utils");
const ajv_1 = require("./ajv");
function oasTypeOf(value) {
    if (Array.isArray(value)) {
        return 'array';
    }
    else if (value === null) {
        return 'null';
    }
    else {
        return typeof value;
    }
}
exports.oasTypeOf = oasTypeOf;
/**
 * Checks if value matches specified JSON schema type
 *
 * @param {*} value - value to check
 * @param {JSONSchemaType} type - JSON Schema type
 * @returns boolean
 */
function matchesJsonSchemaType(value, type, nullable) {
    if (nullable && value === null) {
        return value === null;
    }
    switch (type) {
        case 'array':
            return Array.isArray(value);
        case 'object':
            return typeof value === 'object' && value !== null && !Array.isArray(value);
        case 'null':
            return value === null;
        case 'integer':
            return Number.isInteger(value);
        default:
            return typeof value === type;
    }
}
exports.matchesJsonSchemaType = matchesJsonSchemaType;
function missingRequiredField(type, field) {
    return `${type} object should contain \`${field}\` field.`;
}
exports.missingRequiredField = missingRequiredField;
function fieldNonEmpty(type, field) {
    return `${type} object \`${field}\` must be non-empty string.`;
}
exports.fieldNonEmpty = fieldNonEmpty;
function validateDefinedAndNonEmpty(fieldName, value, ctx) {
    if (typeof value !== 'object') {
        return;
    }
    if (value[fieldName] === undefined) {
        ctx.report({
            message: missingRequiredField(ctx.type.name, fieldName),
            location: ctx.location.child([fieldName]).key(),
        });
    }
    else if (!value[fieldName]) {
        ctx.report({
            message: fieldNonEmpty(ctx.type.name, fieldName),
            location: ctx.location.child([fieldName]).key(),
        });
    }
}
exports.validateDefinedAndNonEmpty = validateDefinedAndNonEmpty;
function getSuggest(given, variants) {
    if (typeof given !== 'string' || !variants.length)
        return [];
    const distances = [];
    for (let i = 0; i < variants.length; i++) {
        const distance = levenshtein(given, variants[i]);
        if (distance < 4) {
            distances.push({ distance, variant: variants[i] });
        }
    }
    distances.sort((a, b) => a.distance - b.distance);
    // if (bestMatch.distance <= 4) return bestMatch.string;
    return distances.map((d) => d.variant);
}
exports.getSuggest = getSuggest;
function validateExample(example, schema, dataLoc, { resolve, location, report }, disallowAdditionalProperties) {
    try {
        const { valid, errors } = ajv_1.validateJsonSchema(example, schema, location.child('schema'), dataLoc.pointer, resolve, disallowAdditionalProperties);
        if (!valid) {
            for (let error of errors) {
                report({
                    message: `Example value must conform to the schema: ${error.message}.`,
                    location: Object.assign(Object.assign({}, new ref_utils_1.Location(dataLoc.source, error.instancePath)), { reportOnKey: error.keyword === 'additionalProperties' }),
                    from: location,
                    suggest: error.suggest,
                });
            }
        }
    }
    catch (e) {
        report({
            message: `Example validation errored: ${e.message}.`,
            location: location.child('schema'),
            from: location,
        });
    }
}
exports.validateExample = validateExample;
