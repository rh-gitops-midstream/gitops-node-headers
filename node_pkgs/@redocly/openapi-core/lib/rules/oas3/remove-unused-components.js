"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveUnusedComponents = void 0;
const utils_1 = require("../../utils");
const RemoveUnusedComponents = () => {
    let components = new Map();
    function registerComponent(location, componentType, name) {
        var _a;
        components.set(location.absolutePointer, {
            used: ((_a = components.get(location.absolutePointer)) === null || _a === void 0 ? void 0 : _a.used) || false,
            componentType,
            name,
        });
    }
    return {
        ref: {
            leave(ref, { type, resolve, key }) {
                if (['Schema', 'Header', 'Parameter', 'Response', 'Example', 'RequestBody'].includes(type.name)) {
                    const resolvedRef = resolve(ref);
                    if (!resolvedRef.location)
                        return;
                    components.set(resolvedRef.location.absolutePointer, {
                        used: true,
                        name: key.toString(),
                    });
                }
            }
        },
        DefinitionRoot: {
            leave(root, ctx) {
                const data = ctx.getVisitorData();
                data.removedCount = 0;
                components.forEach(usageInfo => {
                    const { used, componentType, name } = usageInfo;
                    if (!used && componentType) {
                        let componentChild = root.components[componentType];
                        delete componentChild[name];
                        data.removedCount++;
                        if (utils_1.isEmptyObject(componentChild)) {
                            delete root.components[componentType];
                        }
                    }
                });
                if (utils_1.isEmptyObject(root.components)) {
                    delete root.components;
                }
            },
        },
        NamedSchemas: {
            Schema(schema, { location, key }) {
                if (!schema.allOf) {
                    registerComponent(location, 'schemas', key.toString());
                }
            },
        },
        NamedParameters: {
            Parameter(_parameter, { location, key }) {
                registerComponent(location, 'parameters', key.toString());
            },
        },
        NamedResponses: {
            Response(_response, { location, key }) {
                registerComponent(location, 'responses', key.toString());
            },
        },
        NamedExamples: {
            Example(_example, { location, key }) {
                registerComponent(location, 'examples', key.toString());
            },
        },
        NamedRequestBodies: {
            RequestBody(_requestBody, { location, key }) {
                registerComponent(location, 'requestBodies', key.toString());
            },
        },
        NamedHeaders: {
            Header(_header, { location, key }) {
                registerComponent(location, 'headers', key.toString());
            },
        },
    };
};
exports.RemoveUnusedComponents = RemoveUnusedComponents;
