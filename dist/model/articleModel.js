"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
// article schema
const articleSchema = new Schema({
    title: String,
    image: String,
    description: String,
    likes: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Like",
        }],
    comments: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Comment",
        }],
});
const Article = mongoose_1.default.model("Article", articleSchema);
exports.default = Article;
//# sourceMappingURL=articleModel.js.map