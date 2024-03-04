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
const checkIsLoggedIn_1 = __importDefault(require("../../middlewares/checkIsLoggedIn"));
const articles_1 = __importStar(require("../../controllers/articles"));
const article_1 = __importDefault(require("../../validations/article"));
const articleRouter = (0, express_1.Router)();
// Create a new article, should be logged in and also need to check if is an admin
// validated with validateArticle to avoid incomplete data sent to this endpoint
articleRouter.post("/", checkIsLoggedIn_1.default, article_1.default, articles_1.default);
// Get all articles
articleRouter.get("/", articles_1.getAllArticles);
// get single article
articleRouter.get("/:id", articles_1.getSingleArticle);
// Delete a article by ID, should be an admin, that means has to be
// logged in
articleRouter.delete("/:id", checkIsLoggedIn_1.default, articles_1.deleteArticle);
exports.default = articleRouter;
//# sourceMappingURL=article.routes.js.map