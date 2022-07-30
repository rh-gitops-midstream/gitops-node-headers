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
                if (['Schema', 'Parameter', 'Response', 'SecurityScheme'].includes(type.name)) {
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
                let rootComponents = new Set();
                components.forEach(usageInfo => {
                    const { used, name, componentType } = usageInfo;
                    if (!used && componentType) {
                        rootComponents.add(componentType);
                        delete root[componentType][name];
                        data.removedCount++;
                    }
                });
                for (const component of rootComponents) {
                    if (utils_1.isEmptyObject(root[component])) {
                        delete root[component];
                    }
                }
            },
        },
        NamedSchemas: {
            Schema(schema, { location, key }) {
                if (!schema.allOf) {
                    registerComponent(location, 'definitions', key.toString());
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
        NamedSecuritySchemes: {
            SecurityScheme(_securityScheme, { location, key }) {
                registerComponent(location, 'securityDefinitions', key.toString());
            },
        }
    };
};
exports.RemoveUnusedComponents = RemoveUnusedComponents;
