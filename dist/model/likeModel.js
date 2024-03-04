"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const likeSchema = new Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    article: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Article",
    },
}, { timestamps: true });
const Like = mongoose_1.default.model("Like", likeSchema);
exports.default = Like;
//# sourceMappingURL=likeModel.js.map