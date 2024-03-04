"use strict";
//create message testing
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const globals_1 = require("@jest/globals");
const userModel_1 = __importDefault(require("../model/userModel"));
const articleModel_1 = __importDefault(require("../model/articleModel"));
const article_1 = require("./mocks/article");
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ4YTBhYzQwMzgyMGY1ZDA1Yjg1MDUiLCJpYXQiOjE3MDg4OTMyNDF9.lJ4TNm0l0vvTVyxBBUsoWYeM_ZZMD2Bb435gpgcHQV4";
(0, globals_1.describe)("Test create article", () => {
    (0, globals_1.test)("Test bad data submitted", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        const article = yield (0, supertest_1.default)(app_1.default).post("/api/v1/articles").send({
            name: "name",
            email: "email@gmail.com",
            message: "message",
        }).set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(article.status).toBe(400);
    }));
    (0, globals_1.test)("test success", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(articleModel_1.default.prototype, "save").mockResolvedValueOnce(article_1.createdArticle);
        const article = yield (0, supertest_1.default)(app_1.default).post("/api/v1/articles").send({
            title: "Article title",
            description: "Article description",
            image: "image url",
        }).set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(article.status).toBe(201);
    }));
    (0, globals_1.test)("Test sever error", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(articleModel_1.default.prototype, "save").mockRejectedValueOnce(new Error("Server error"));
        const article = yield (0, supertest_1.default)(app_1.default).post("/api/v1/articles").send({
            title: "Article title",
            description: "Article description",
            image: "image url",
        }).set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(article.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test get single article", () => {
    (0, globals_1.test)('Test article not found', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(articleModel_1.default, "findById").mockResolvedValueOnce(undefined);
        const articles = yield (0, supertest_1.default)(app_1.default).get("/api/v1/articles/articleId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(articles.status).toBe(404);
    }));
    (0, globals_1.test)('Test get article success', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(articleModel_1.default, "findById").mockResolvedValueOnce(article_1.createdArticle);
        const articles = yield (0, supertest_1.default)(app_1.default).get("/api/v1/articles/articleId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(articles.status).toBe(200);
    }));
    (0, globals_1.test)('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(articleModel_1.default, "findById").mockRejectedValueOnce(new Error("Server error"));
        const articles = yield (0, supertest_1.default)(app_1.default).get("/api/v1/articles/articleId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(articles.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test get all articles", () => {
    (0, globals_1.test)('Test no articles found', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(articleModel_1.default, "find").mockResolvedValueOnce([]);
        const articles = yield (0, supertest_1.default)(app_1.default).get("/api/v1/articles");
        (0, globals_1.expect)(articles.status).toBe(404);
    }));
    (0, globals_1.test)('Test get all articles success', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(articleModel_1.default, "find").mockResolvedValueOnce([article_1.createdArticle]);
        const articles = yield (0, supertest_1.default)(app_1.default).get("/api/v1/articles").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(articles.status).toBe(200);
    }));
    (0, globals_1.test)('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(articleModel_1.default, "find").mockRejectedValueOnce(new Error("Server error"));
        const articles = yield (0, supertest_1.default)(app_1.default).get("/api/v1/articles").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(articles.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test delete an article", () => {
    (0, globals_1.test)('Test article not found', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(articleModel_1.default, "findByIdAndDelete").mockResolvedValueOnce(undefined);
        const articles = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/mesaages/articleId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(articles.status).toBe(404);
    }));
    globals_1.test.skip('Test delete article success', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(articleModel_1.default, "findByIdAndDelete").mockResolvedValueOnce(article_1.createdArticle);
        const articles = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/mesaages/articleId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(articles.status).toBe(200);
    }));
    globals_1.test.skip('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(articleModel_1.default, "findByIdAndDelete").mockRejectedValueOnce(new Error("Server error"));
        const articles = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/mesaages/articleId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(articles.status).toBe(500);
    }));
});
//# sourceMappingURL=articles.test.js.map