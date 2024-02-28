"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_routes_1 = __importDefault(require("./api/comment.routes"));
const user_routes_1 = __importDefault(require("./api/user.routes"));
const message_routes_1 = __importDefault(require("./api/message.routes"));
const article_routes_1 = __importDefault(require("./api/article.routes"));
const router = (0, express_1.Router)();
// comments routes
router.use('/comments', comment_routes_1.default);
// users routes
router.use('/users', user_routes_1.default);
// messages routes
router.use('/messages', message_routes_1.default);
// articles routes
router.use('/articles', article_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map