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
const user_1 = require("../../controllers/user");
const checkIsLoggedIn_1 = __importDefault(require("../../middlewares/checkIsLoggedIn"));
const user_2 = __importStar(require("../../validations/user"));
const isAdmin_1 = __importDefault(require("../../middlewares/isAdmin"));
const userRouter = (0, express_1.Router)();
// Get all users /api/v1/users
userRouter.get("/", checkIsLoggedIn_1.default, isAdmin_1.default, user_1.getAllUsers);
// Register a new user
userRouter.post("/register", user_2.default, user_1.registerUser);
// Get single user by ID
userRouter.get("/:id", checkIsLoggedIn_1.default, user_1.getSingleUser);
// Delete user by ID
userRouter.delete("/:id", checkIsLoggedIn_1.default, isAdmin_1.default, user_1.deleteUser);
// User login route
userRouter.post("/login", user_2.validateLogin, user_1.loginUser);
userRouter.patch("/assign-role", checkIsLoggedIn_1.default, isAdmin_1.default, user_2.validateRole, user_1.assignRoleToUser);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map