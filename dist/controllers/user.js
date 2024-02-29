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
exports.loginUser = exports.deleteUser = exports.getSingleUser = exports.registerUser = exports.getAllUsers = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// get all users controller
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_1.default.find();
        if (users.length > 0) {
            return res.status(200).json({ message: "success", data: users });
        }
        else {
            return res.status(404).json({ message: "No users found in your database" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});
exports.getAllUsers = getAllUsers;
// create or register user controller
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email, username, name } = req.body;
    try {
        const existingUser = yield userModel_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already taken" });
        }
        const newUser = new userModel_1.default({ password, email, username, name });
        const user = yield newUser.save();
        return res.status(201).json(user);
    }
    catch (error) {
        console.log("Error in user registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.registerUser = registerUser;
// get single user controller
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield userModel_1.default.findById(id);
        if (user) {
            return res.status(200).json({ message: "User found", data: user });
        }
        else {
            return res.status(404).json({ message: "User not found or invalid user ID" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSingleUser = getSingleUser;
// Delete user controller
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedUser = yield userModel_1.default.findByIdAndDelete(id);
        if (deletedUser) {
            return res.status(200).json({ message: "User found and successfully deleted", data: deletedUser });
        }
        else {
            return res.status(404).json({ message: "User not found or invalid user ID and not deleted" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteUser = deleteUser;
// login/signin a user controller
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.status(200).json({ message: "Login successful", user, token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: `${error}` });
    }
});
exports.loginUser = loginUser;
//# sourceMappingURL=user.js.map