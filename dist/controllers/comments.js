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
exports.deleteComment = exports.getSingleComment = exports.getAllComments = void 0;
const commentModel_1 = require("../model/commentModel");
const articleModel_1 = __importDefault(require("../model/articleModel"));
// controller to create comment
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment, articleId } = req.body;
        const exist = yield articleModel_1.default.findById(articleId);
        if (!exist) {
            return res.status(404).json({ error: "Article not found!" });
        }
        const newComment = new commentModel_1.Comment({
            comment,
            article: articleId,
            user: req.user._id,
        });
        const savedComment = yield newComment.save();
        yield articleModel_1.default.updateOne({ _id: exist._id }, { $push: { comments: savedComment._id } }, { new: true });
        return res.status(201).json({
            status: "success",
            comment: savedComment,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// controller to get all comments
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allComments = yield commentModel_1.Comment.find();
        if (allComments.length > 0) {
            return res.status(200).json({ status: "success", data: allComments });
        }
        else {
            return res.status(404).json({ message: "No Comment found in database" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllComments = getAllComments;
// get single comment controller
const getSingleComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const comment = yield commentModel_1.Comment.findById(id);
        if (comment) {
            return res.status(200).json({ message: "Comment found", data: comment });
        }
        else {
            return res.status(404).json({ message: "Comment not found or invalid user ID" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSingleComment = getSingleComment;
// Delete a comment controller
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedComment = yield commentModel_1.Comment.findByIdAndDelete(id);
        if (deletedComment) {
            return res.status(200).json({ message: "Comment found and successfully deleted", data: deletedComment });
        }
        else {
            return res.status(404).json({ message: "Comment not found or invalid message ID and not deleted" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteComment = deleteComment;
exports.default = createComment;
//# sourceMappingURL=comments.js.map