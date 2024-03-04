"use strict";
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
const bcrypt_1 = __importDefault(require("bcrypt"));
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWQ4YTBhYzQwMzgyMGY1ZDA1Yjg1MDUiLCJpYXQiOjE3MDg4OTMyNDF9.lJ4TNm0l0vvTVyxBBUsoWYeM_ZZMD2Bb435gpgcHQV4";
(0, globals_1.test)("Test home route", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.default).get("/");
    (0, globals_1.expect)(res.statusCode).toBe(200);
}));
(0, globals_1.test)("Test non exist route", () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield (0, supertest_1.default)(app_1.default).get("/dfghjjgfgd");
    (0, globals_1.expect)(res.status).toBe(404);
}));
(0, globals_1.describe)("Test user registration", () => {
    (0, globals_1.test)("Test user exist", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest
            .spyOn(userModel_1.default, "findOne")
            .mockResolvedValueOnce({ name: "test", email: "test@example.com" });
        const user = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users/register").send({
            name: "test",
            email: "test@example.com",
            password: "testpassword",
            username: "testuser",
        });
        (0, globals_1.expect)(user.status).toBe(409);
    }));
    globals_1.test.skip("Test success", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(bcrypt_1.default, 'hash').mockResolvedValueOnce("something");
        globals_1.jest.spyOn(userModel_1.default, "findOne").mockResolvedValueOnce(undefined);
        globals_1.jest
            .spyOn(userModel_1.default.prototype, "save")
            .mockResolvedValueOnce({ name: "test", email: "test@example.com" });
        const user = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users/register").send({
            name: "test",
            email: "test@example.com",
            password: "testpassword",
            username: "testuser",
        });
        (0, globals_1.expect)(user.status).toBe(201);
    }));
    globals_1.test.skip("test 500 internal error", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(bcrypt_1.default, 'hash').mockResolvedValueOnce("something");
        globals_1.jest.spyOn(userModel_1.default, "findOne").mockResolvedValueOnce(undefined);
        globals_1.jest
            .spyOn(userModel_1.default.prototype, "save")
            .mockRejectedValueOnce(new Error("Server error"));
        const comment = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users/register").send({
            name: "test",
            email: "test@example.com",
            password: "testpassword",
            username: "testuser",
        });
        (0, globals_1.expect)(comment.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test user login", () => {
    (0, globals_1.test)("Test user does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findOne").mockResolvedValueOnce(undefined);
        const user = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users/login").send({
            email: "test@example.com",
            password: "testpassword",
        });
        (0, globals_1.expect)(user.status).toBe(404);
    }));
    (0, globals_1.test)("Test password incorrect password", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findOne").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpass" });
        const user = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users/login").send({
            email: "test@example.com",
            password: "testpassword",
        });
        (0, globals_1.expect)(user.status).toBe(401);
    }));
    (0, globals_1.test)("Test success", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(bcrypt_1.default, 'compareSync').mockResolvedValueOnce(true);
        globals_1.jest.spyOn(userModel_1.default, "findOne").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        const user = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users/login").send({
            email: "test@example.com",
            password: "testpassword",
        });
        (0, globals_1.expect)(user.status).toBe(200);
    }));
    (0, globals_1.test)("test 500 internal error", () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(bcrypt_1.default, 'compareSync').mockResolvedValueOnce(true);
        globals_1.jest.spyOn(userModel_1.default, "findOne").mockRejectedValueOnce(new Error("Server error"));
        const user = yield (0, supertest_1.default)(app_1.default).post("/api/v1/users/login").send({
            email: "test@example.com",
            password: "testpassword",
        });
        (0, globals_1.expect)(user.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test get all users", () => {
    (0, globals_1.describe)("Test isLoggedIn middleware", () => {
        (0, globals_1.test)('Test no token', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield (0, supertest_1.default)(app_1.default).get("/api/v1/users");
            (0, globals_1.expect)(users.status).toBe(401);
        }));
        (0, globals_1.test)('Test invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield (0, supertest_1.default)(app_1.default).get("/api/v1/users").set({ "Authorization": "Bearer some_token" });
            (0, globals_1.expect)(users.status).toBe(401);
        }));
        (0, globals_1.test)('Test token is valid but no user found', () => __awaiter(void 0, void 0, void 0, function* () {
            globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce(undefined);
            const users = yield (0, supertest_1.default)(app_1.default).get("/api/v1/users").set({ "Authorization": `Bearer ${token}` });
            (0, globals_1.expect)(users.status).toBe(401);
        }));
        globals_1.test.skip('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
            globals_1.jest.spyOn(userModel_1.default, "findById").mockRejectedValueOnce(new Error("Server error"));
            const users = yield (0, supertest_1.default)(app_1.default).get("/api/v1/users").set({ "Authorization": `Bearer ${token}` });
            (0, globals_1.expect)(users.status).toBe(500);
        }));
        // if everything is ok, it will procced to get all users
    });
    (0, globals_1.test)('Test no users', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin" });
        globals_1.jest.spyOn(userModel_1.default, "find").mockResolvedValueOnce([]);
        const users = yield (0, supertest_1.default)(app_1.default).get("/api/v1/users").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(users.status).toBe(404);
    }));
    (0, globals_1.test)('Test success get all users', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin" });
        globals_1.jest.spyOn(userModel_1.default, "find").mockResolvedValueOnce([{ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" }]);
        const users = yield (0, supertest_1.default)(app_1.default).get("/api/v1/users").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(users.status).toBe(200);
    }));
    (0, globals_1.test)('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin" });
        globals_1.jest.spyOn(userModel_1.default, "find").mockRejectedValueOnce(new Error("Server error"));
        const users = yield (0, supertest_1.default)(app_1.default).get("/api/v1/users").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(users.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test get single user", () => {
    (0, globals_1.test)('Test user not found', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" }).mockResolvedValueOnce(undefined);
        const users = yield (0, supertest_1.default)(app_1.default).get("/api/v1/users/userId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(users.status).toBe(404);
    }));
    (0, globals_1.test)('Test get user success', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" }).mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        const users = yield (0, supertest_1.default)(app_1.default).get("/api/v1/users/userId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(users.status).toBe(200);
    }));
    (0, globals_1.test)('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" }).mockRejectedValueOnce(new Error("Server error"));
        const users = yield (0, supertest_1.default)(app_1.default).get("/api/v1/users/userId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(users.status).toBe(500);
    }));
});
(0, globals_1.describe)("Test delete user", () => {
    (0, globals_1.test)('Test user not found', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin" });
        globals_1.jest.spyOn(userModel_1.default, "findByIdAndDelete").mockResolvedValueOnce(undefined);
        const users = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/users/userId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(users.status).toBe(404);
    }));
    (0, globals_1.test)('Test delete user success', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin" });
        globals_1.jest.spyOn(userModel_1.default, "findByIdAndDelete").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id" });
        const users = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/users/userId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(users.status).toBe(200);
    }));
    (0, globals_1.test)('Test server error', () => __awaiter(void 0, void 0, void 0, function* () {
        globals_1.jest.spyOn(userModel_1.default, "findById").mockResolvedValueOnce({ name: "test", email: "test@example.com", password: "testpassword", _id: "Some_user_id", role: "admin" }).mockRejectedValueOnce(new Error("Server error"));
        const users = yield (0, supertest_1.default)(app_1.default).delete("/api/v1/users/userId").set({ "Authorization": `Bearer ${token}` });
        (0, globals_1.expect)(users.status).toBe(500);
    }));
});
//# sourceMappingURL=user.test.js.map