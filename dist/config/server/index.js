"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const routes_1 = __importDefault(require("./routes"));
const environment_1 = __importDefault(require("../environment"));
const doc_1 = __importDefault(require("./doc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use('/api', routes_1.default);
app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(doc_1.default));
app.listen(environment_1.default.api.port, () => {
    console.log(`Server is running at http://localhost:${environment_1.default.api.port}`);
});
