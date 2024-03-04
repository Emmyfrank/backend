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
const messages_1 = require("./mocks/messages");
const messageModel_1 = __importDefault(require("../model/messageModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ4YTBhYzQwMzgyMGY1ZDA1Yjg1MDUiLCJpYXQiOjE3MDg4OTMyNDF9.lJ4TNm0l0vvTVyxBBUsoWYeM_ZZMD2Bb435gpgcHQV4";
(0, globals_1.describe)("Test create amessage", () => {
    (0, globals_1.test)("test success", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(messageModel_1.default.prototype, "save").mockResolvedValueOnce(messages_1.createdMessage);
        const message = yield (0, supertest_1.default)(app_1.default).post("/api/v1/messages").send({
            name: "name",
            email: "email@gmail.com",
            message: "message",
        });
        (0, globals_1.expect)(message.status).toBe(201);
    }));
    (0, globals_1.test)("Test sever error", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(messageModel_1.default.prototype, "save").mockRejectedValueOnce(new Error("Server error"));
        const message = yield (0, supertest_1.default)(app_1.default).post("/api/v1/messages").send({
            name: "name",
            email: "email@gmail.com",
            message: "message",
        });
        (0, globals_1.expect)(message.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test get single message", () => {
    (0, globals_1.test)('Test message not found', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(messageModel_1.default, "findById").mockResolvedValueOnce(undefined);
        const messages = yield (0, supertest_1.default)(app_1.default).get("/api/v1/messages/messageId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(messages.status).toBe(404);
    }));
    (0, globals_1.test)('Test get message success', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(messageModel_1.default, "findById").mockResolvedValueOnce(messages_1.createdMessage);
        const messages = yield (0, supertest_1.default)(app_1.default).get("/api/v1/messages/messageId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(messages.status).toBe(200);
    }));
    (0, globals_1.test)('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(messageModel_1.default, "findById").mockRejectedValueOnce(new Error("Server error"));
        const messages = yield (0, supertest_1.default)(app_1.default).get("/api/v1/messages/messageId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(messages.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test get all messages", () => {
    (0, globals_1.test)('Test no messages found', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin" });
        globals_1.jest.spyOn(messageModel_1.default, "find").mockResolvedValueOnce([]);
        const messages = yield (0, supertest_1.default)(app_1.default).get("/api/v1/messages").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(messages.status).toBe(404);
    }));
    (0, globals_1.test)('Test get messages success', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin" });
        globals_1.jest.spyOn(messageModel_1.default, "find").mockResolvedValueOnce([messages_1.createdMessage]);
        const messages = yield (0, supertest_1.default)(app_1.default).get("/api/v1/messages").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(messages.status).toBe(200);
    }));
    (0, globals_1.test)('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin" });
        globals_1.jest.spyOn(messageModel_1.default, "find").mockRejectedValueOnce(new Error("Server error"));
        const messages = yield (0, supertest_1.default)(app_1.default).get("/api/v1/messages").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(messages.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test delete message", () => {
    (0, globals_1.test)('Test message not found', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(messageModel_1.default, "findByIdAndDelete").mockResolvedValueOnce(undefined);
        const messages = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/mesaages/messageId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(messages.status).toBe(404);
    }));
    globals_1.test.skip('Test delete message success', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(messageModel_1.default, "findByIdAndDelete").mockResolvedValueOnce(messages_1.createdMessage);
        const messages = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/mesaages/messageId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(messages.status).toBe(200);
    }));
    globals_1.test.skip('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        globals_1.jest.spyOn(messageModel_1.default, "findByIdAndDelete").mockRejectedValueOnce(new Error("Server error"));
        const messages = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/mesaages/messageId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(messages.status).toBe(500);
    }));
});
//# sourceMappingURL=messages.test.js.map