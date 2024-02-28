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
exports.validateLogin = void 0;
const joi_1 = __importDefault(require("joi"));
const registerSchem = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
});
const loginSchem = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
});
function validateRegister(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.body = yield registerSchem.validateAsync(req.body, { abortEarly: false });
            return next();
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
exports.default = validateRegister;
const validateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body = yield loginSchem.validateAsync(req.body, { abortEarly: false });
        return next();
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
});
exports.validateLogin = validateLogin;
//# sourceMappingURL=user.js.map