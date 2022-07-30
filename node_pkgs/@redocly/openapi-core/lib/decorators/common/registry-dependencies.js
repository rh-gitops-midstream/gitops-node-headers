"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistryDependencies = void 0;
const redocly_1 = require("../../redocly");
const RegistryDependencies = () => {
    let registryDependencies = new Set();
    return {
        DefinitionRoot: {
            leave(_, ctx) {
                const data = ctx.getVisitorData();
                data.links = Array.from(registryDependencies);
            },
        },
        ref(node) {
            if (node.$ref) {
                const link = node.$ref.split('#/')[0];
                if (redocly_1.isRedoclyRegistryURL(link)) {
                    registryDependencies.add(link);
                }
            }
        },
    };
};
exports.RegistryDependencies = RegistryDependencies;
