"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const currPath = path_1.default.resolve(__dirname);
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Talent Hub Api',
            version: '1.0.0',
            description: 'Fatec Talent Hub API v1',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Local server',
            },
        ],
    },
    apis: [`${currPath}/routes.ts`, `${currPath}/../../**/*routes.ts`],
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.default = specs;
