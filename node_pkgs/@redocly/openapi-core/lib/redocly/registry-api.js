"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistryApi = void 0;
const node_fetch_1 = require("node-fetch");
const config_1 = require("../config/config");
const utils_1 = require("../utils");
const version = require('../../package.json').version;
class RegistryApi {
    constructor(accessTokens, region) {
        this.accessTokens = accessTokens;
        this.region = region;
    }
    get accessToken() {
        return utils_1.isNotEmptyObject(this.accessTokens) && this.accessTokens[this.region];
    }
    getBaseUrl(region = config_1.DEFAULT_REGION) {
        return `https://api.${config_1.DOMAINS[region]}/registry`;
    }
    setAccessTokens(accessTokens) {
        this.accessTokens = accessTokens;
        return this;
    }
    request(path = '', options = {}, region) {
        return __awaiter(this, void 0, void 0, function* () {
            const headers = Object.assign({}, options.headers || {}, { 'x-redocly-cli-version': version });
            if (!headers.hasOwnProperty('authorization')) {
                throw new Error('Unauthorized');
            }
            const response = yield node_fetch_1.default(`${this.getBaseUrl(region)}${path}`, Object.assign({}, options, { headers }));
            if (response.status === 401) {
                throw new Error('Unauthorized');
            }
            if (response.status === 404) {
                const body = yield response.json();
                throw new Error(body.code);
            }
            return response;
        });
    }
    authStatus(accessToken, region, verbose = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.request('', { headers: { authorization: accessToken } }, region);
                return response.ok;
            }
            catch (error) {
                if (verbose) {
                    console.log(error);
                }
                return false;
            }
        });
    }
    prepareFileUpload({ organizationId, name, version, filesHash, filename, isUpsert, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.request(`/${organizationId}/${name}/${version}/prepare-file-upload`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: this.accessToken,
                },
                body: JSON.stringify({
                    filesHash,
                    filename,
                    isUpsert,
                }),
            }, this.region);
            if (response.ok) {
                return response.json();
            }
            throw new Error('Could not prepare file upload');
        });
    }
    pushApi({ organizationId, name, version, rootFilePath, filePaths, branch, isUpsert, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.request(`/${organizationId}/${name}/${version}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    authorization: this.accessToken
                },
                body: JSON.stringify({
                    rootFilePath,
                    filePaths,
                    branch,
                    isUpsert,
                }),
            }, this.region);
            if (response.ok) {
                return;
            }
            throw new Error('Could not push api');
        });
    }
}
exports.RegistryApi = RegistryApi;
