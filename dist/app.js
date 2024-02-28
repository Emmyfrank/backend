"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
const documentation_1 = __importDefault(require("./documentation"));
const notFount_1 = __importDefault(require("./controllers/notFount"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
// Welcome route
app.get("/", (req, res) => res.send("Welcome home"));
// routes
app.use('/api/v1', routes_1.default);
// documentation route
app.use('/docs', documentation_1.default);
// will handle all routes that do not exist
app.all("*", notFount_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map