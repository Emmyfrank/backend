"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comments_1 = __importStar(require("../../controllers/comments"));
const checkIsLoggedIn_1 = __importDefault(require("../../middlewares/checkIsLoggedIn"));
const comment_1 = __importDefault(require("../../validations/comment"));
const commentRouter = (0, express_1.Router)();
// a route to create a comment via endpoint api/v1/comments
commentRouter.post("/", checkIsLoggedIn_1.default, comment_1.default, comments_1.default);
// Get all comment via endpoint api/v1/comments
commentRouter.get("/", comments_1.getAllComments);
// get single comment by ID
commentRouter.get("/:id", comments_1.getSingleComment);
// Delete a comment by ID
commentRouter.delete("/:id", checkIsLoggedIn_1.default, comments_1.deleteComment);
exports.default = commentRouter;
//# sourceMappingURL=comment.routes.js.map