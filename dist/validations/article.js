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
const joi_1 = __importDefault(require("joi"));
const articleSchem = joi_1.default.object({
    title: joi_1.default.string().required(),
    image: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
});
function validateArticle(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.body = yield articleSchem.validateAsync(req.body, { abortEarly: false });
            return next();
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    });
}
exports.default = validateArticle;
//# sourceMappingURL=article.js.map