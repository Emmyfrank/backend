"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// const commentSchema = new Schema({
//     name: String,
//     comment: String
// });
const commentSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    article: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Article",
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });
exports.Comment = mongoose_1.default.model("Comment", commentSchema);
//# sourceMappingURL=commentModel.js.map