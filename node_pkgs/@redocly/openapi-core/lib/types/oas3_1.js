"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Oas3_1Types = void 0;
const _1 = require(".");
const oas3_1 = require("./oas3");
const DefinitionRoot = {
    properties: {
        openapi: null,
        info: 'Info',
        servers: _1.listOf('Server'),
        security: _1.listOf('SecurityRequirement'),
        tags: _1.listOf('Tag'),
        externalDocs: 'ExternalDocs',
        paths: 'PathMap',
        webhooks: 'WebhooksMap',
        components: 'Components',
        jsonSchemaDialect: { type: 'string' },
    },
    required: ['openapi', 'info'],
    requiredOneOf: ['paths', 'components', 'webhooks']
};
const License = {
    properties: {
        name: { type: 'string' },
        url: { type: 'string' },
        identifier: { type: 'string' },
    },
    required: ['name'],
};
const Info = {
    properties: {
        title: { type: 'string' },
        version: { type: 'string' },
        description: { type: 'string' },
        termsOfService: { type: 'string' },
        summary: { type: 'string' },
        contact: 'Contact',
        license: 'License',
    },
    required: ['title', 'version'],
};
const Components = {
    properties: {
        parameters: 'NamedParameters',
        schemas: 'NamedSchemas',
        responses: 'NamedResponses',
        examples: 'NamedExamples',
        requestBodies: 'NamedRequestBodies',
        headers: 'NamedHeaders',
        securitySchemes: 'NamedSecuritySchemes',
        links: 'NamedLinks',
        callbacks: 'NamedCallbacks',
        pathItems: 'NamedPathItems',
    },
};
const Operation = {
    properties: {
        tags: {
            type: 'array',
            items: { type: 'string' },
        },
        summary: { type: 'string' },
        description: { type: 'string' },
        externalDocs: 'ExternalDocs',
        operationId: { type: 'string' },
        parameters: _1.listOf('Parameter'),
        security: _1.listOf('SecurityRequirement'),
        servers: _1.listOf('Server'),
        requestBody: 'RequestBody',
        responses: 'ResponsesMap',
        deprecated: { type: 'boolean' },
        callbacks: _1.mapOf('Callback'),
        'x-codeSamples': _1.listOf('XCodeSample'),
        'x-code-samples': _1.listOf('XCodeSample'), // deprecated
    },
};
const Schema = {
    properties: {
        $id: { type: 'string' },
        id: { type: 'string' },
        $schema: { type: 'string' },
        definitions: 'NamedSchemas',
        $defs: 'NamedSchemas',
        $vocabulary: { type: 'string' },
        externalDocs: 'ExternalDocs',
        discriminator: 'Discriminator',
        myArbitraryKeyword: { type: 'boolean' },
        title: { type: 'string' },
        multipleOf: { type: 'number' },
        maximum: { type: 'number' },
        minimum: { type: 'number' },
        exclusiveMaximum: { type: 'number' },
        exclusiveMinimum: { type: 'number' },
        maxLength: { type: 'number' },
        minLength: { type: 'number' },
        pattern: { type: 'string' },
        maxItems: { type: 'number' },
        minItems: { type: 'number' },
        uniqueItems: { type: 'boolean' },
        maxProperties: { type: 'number' },
        minProperties: { type: 'number' },
        required: { type: 'array', items: { type: 'string' } },
        enum: { type: 'array' },
        type: (value) => {
            if (Array.isArray(value)) {
                return { type: 'array', items: { enum: ['object', 'array', 'string', 'number', 'integer', 'boolean', 'null'] } };
            }
            else {
                return {
                    enum: ['object', 'array', 'string', 'number', 'integer', 'boolean', 'null'],
                };
            }
        },
        allOf: _1.listOf('Schema'),
        anyOf: _1.listOf('Schema'),
        oneOf: _1.listOf('Schema'),
        not: 'Schema',
        if: 'Schema',
        then: 'Schema',
        else: 'Schema',
        dependentSchemas: _1.listOf('Schema'),
        prefixItems: _1.listOf('Schema'),
        contains: 'Schema',
        patternProperties: { type: 'object' },
        propertyNames: 'Schema',
        unevaluatedItems: 'Schema',
        unevaluatedProperties: 'Schema',
        summary: { type: 'string' },
        properties: 'SchemaProperties',
        items: (value) => {
            if (Array.isArray(value)) {
                return _1.listOf('Schema');
            }
            else if (typeof value === 'boolean') {
                return { type: 'boolean' };
            }
            else {
                return 'Schema';
            }
        },
        additionalProperties: (value) => {
            return typeof value === 'boolean' ? { type: 'boolean' } : 'Schema';
        },
        description: { type: 'string' },
        format: { type: 'string' },
        contentEncoding: { type: 'string' },
        contentMediaType: { type: 'string' },
        default: null,
        readOnly: { type: 'boolean' },
        writeOnly: { type: 'boolean' },
        xml: 'Xml',
        examples: { type: 'array' },
        example: { isExample: true },
        deprecated: { type: 'boolean' },
        const: null,
        $comment: { type: 'string' },
    },
};
const SecurityScheme = {
    properties: {
        type: { enum: ['apiKey', 'http', 'oauth2', 'openIdConnect', 'mutualTLS'] },
        description: { type: 'string' },
        name: { type: 'string' },
        in: { type: 'string', enum: ['query', 'header', 'cookie'] },
        scheme: { type: 'string' },
        bearerFormat: { type: 'string' },
        flows: 'SecuritySchemeFlows',
        openIdConnectUrl: { type: 'string' },
    },
    required(value) {
        switch (value === null || value === void 0 ? void 0 : value.type) {
            case 'apiKey':
                return ['type', 'name', 'in'];
            case 'http':
                return ['type', 'scheme'];
            case 'oauth2':
                return ['type', 'flows'];
            case 'openIdConnect':
                return ['type', 'openIdConnectUrl'];
            default:
                return ['type'];
        }
    },
    allowed(value) {
        switch (value === null || value === void 0 ? void 0 : value.type) {
            case 'apiKey':
                return ['type', 'name', 'in', 'description'];
            case 'http':
                return ['type', 'scheme', 'bearerFormat', 'description'];
            case 'oauth2':
                switch (value === null || value === void 0 ? void 0 : value.flows) {
                    case 'implicit':
                        return ['type', 'flows', 'authorizationUrl', 'refreshUrl', 'description', 'scopes'];
                    case 'password':
                    case 'clientCredentials':
                        return ['type', 'flows', 'tokenUrl', 'refreshUrl', 'description', 'scopes'];
                    case 'authorizationCode':
                        return ['type', 'flows', 'authorizationUrl', 'refreshUrl', 'tokenUrl', 'description', 'scopes'];
                    default:
                        return ['type', 'flows', 'authorizationUrl', 'refreshUrl', 'tokenUrl', 'description', 'scopes'];
                }
            case 'openIdConnect':
                return ['type', 'openIdConnectUrl', 'description'];
            case 'mutualTLS':
                return ['type', 'description'];
            default:
                return ['type', 'description'];
        }
    },
    extensionsPrefix: 'x-',
};
exports.Oas3_1Types = Object.assign(Object.assign({}, oas3_1.Oas3Types), { Info,
    DefinitionRoot,
    Schema,
    License,
    Components, NamedPathItems: _1.mapOf('PathItem'), SecurityScheme,
    Operation });
