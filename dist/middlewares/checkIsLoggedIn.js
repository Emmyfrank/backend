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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
// a middleware to protect routes that needs a user to be logged in
function isLoggedIn(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = req.headers.authorization;
            if (token && token.startsWith("Bearer ")) {
                token = token.split(" ")[1];
            }
            else {
                return res.status(401).json({ message: "You need to sign in" });
            }
            jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET), function (err, decoded) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        return res.status(401).json({ message: "Invalid token" });
                    const user = yield userModel_1.default.findById(decoded.userId);
                    if (user) {
                        req.user = user;
                        return next();
                    }
                    else {
                        return res.status(401).json({ message: "Token expired" });
                    }
                });
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
}
exports.default = isLoggedIn;
//# sourceMappingURL=checkIsLoggedIn.js.map