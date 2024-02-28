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
require("dotenv/config");
const commentModel_1 = require("../model/commentModel");
const comments_1 = require("./mocks/comments");
const userModel_1 = __importDefault(require("../model/userModel"));
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ4YTBhYzQwMzgyMGY1ZDA1Yjg1MDUiLCJpYXQiOjE3MDg4OTMyNDF9.lJ4TNm0l0vvTVyxBBUsoWYeM_ZZMD2Bb435gpgcHQV4";
(0, globals_1.describe)('Test create comment', () => {
    (0, globals_1.test)("test success", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(commentModel_1.Comment.prototype, "save").mockResolvedValueOnce(comments_1.createdComment);
        const comment = yield (0, supertest_1.default)(app_1.default).post("/api/v1/comments").send({
            name: "name",
            comment: "hello test"
        });
        (0, globals_1.expect)(comment.status).toBe(201);
    }));
    (0, globals_1.test)("test 500 internal error", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(commentModel_1.Comment.prototype, "save").mockRejectedValueOnce(new Error('Server error'));
        const comment = yield (0, supertest_1.default)(app_1.default).post("/api/v1/comments").send({
            name: "name",
            comment: "hello test"
        });
        (0, globals_1.expect)(comment.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test get all comments", () => {
    (0, globals_1.test)('Test no comments found', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(commentModel_1.Comment, "find").mockResolvedValueOnce([]);
        const comments = yield (0, supertest_1.default)(app_1.default).get("/api/v1/comments");
        (0, globals_1.expect)(comments.status).toBe(404);
    }));
    (0, globals_1.test)('Test success get comments', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(commentModel_1.Comment, "find").mockResolvedValueOnce([comments_1.createdComment]);
        const comments = yield (0, supertest_1.default)(app_1.default).get("/api/v1/comments");
        (0, globals_1.expect)(comments.status).toBe(200);
    }));
    (0, globals_1.test)('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(commentModel_1.Comment, "find").mockRejectedValueOnce(new Error("Server error"));
        const comments = yield (0, supertest_1.default)(app_1.default).get("/api/v1/comments");
        (0, globals_1.expect)(comments.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test get single comment", () => {
    (0, globals_1.test)('Test no comments found', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(commentModel_1.Comment, "findById").mockResolvedValueOnce(undefined);
        const comment = yield (0, supertest_1.default)(app_1.default).get("/api/v1/comments/commentId");
        (0, globals_1.expect)(comment.status).toBe(404);
    }));
    (0, globals_1.test)('Test success single comment', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(commentModel_1.Comment, "findById").mockResolvedValueOnce(comments_1.createdComment);
        const comment = yield (0, supertest_1.default)(app_1.default).get("/api/v1/comments/commentId");
        (0, globals_1.expect)(comment.status).toBe(200);
    }));
    (0, globals_1.test)('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(commentModel_1.Comment, "findById").mockRejectedValueOnce(new Error("Server error"));
        const comment = yield (0, supertest_1.default)(app_1.default).get("/api/v1/comments/commentId");
        (0, globals_1.expect)(comment.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test delete comment", () => {
    (0, globals_1.test)('Test comment not found', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(commentModel_1.Comment, "findByIdAndDelete").mockResolvedValueOnce(undefined);
        const comment = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/comments/commentId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(comment.status).toBe(404);
    }));
    (0, globals_1.test)('Test delete message success', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(commentModel_1.Comment, "findByIdAndDelete").mockResolvedValueOnce(comments_1.createdComment);
        const comment = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/comments/commentId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(comment.status).toBe(200);
    }));
    (0, globals_1.test)('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(commentModel_1.Comment, "findByIdAndDelete").mockRejectedValueOnce(new Error("Server error"));
        const comment = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/comments/commentId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(comment.status).toBe(500);
    }));
});
//# sourceMappingURL=comments.test.js.map