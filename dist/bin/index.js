"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const next_1 = __importDefault(require("next"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("../config/index");
const { server: { port }, api: { credentials }, } = index_1.config;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next_1.default({ dev });
const expressApp = express_1.default();
const handle = nextApp.getRequestHandler();
exports.main = async () => {
    await nextApp.prepare();
    expressApp.use(cookie_parser_1.default());
    expressApp.use(express_1.default.json());
    expressApp.use(express_1.default.urlencoded({ extended: true }));
    expressApp.use(cors_1.default({
        origin: 'http://localhost:3000',
        credentials,
    }));
    expressApp.all('*', (req, res) => {
        return handle(req, res);
    });
    await expressApp.listen(port);
    console.log(`Server running at port ${port}`);
};
