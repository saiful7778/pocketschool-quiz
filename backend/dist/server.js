"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("./utils/env"));
const expressApp_1 = __importDefault(require("./expressApp"));
const connectDB_1 = __importDefault(require("./utils/connectDB"));
(async () => {
    const app = (0, expressApp_1.default)();
    await (0, connectDB_1.default)();
    const port = (0, env_1.default)("port");
    app.listen(port, () => {
        console.log(`server is running on port:${port}`);
    });
})();
