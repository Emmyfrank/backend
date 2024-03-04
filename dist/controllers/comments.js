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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.getSingleComment = exports.getAllComments = void 0;
const commentModel_1 = require("../model/commentModel");
// controller to create comment
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newComment = new commentModel_1.Comment(Object.assign({}, req.body));
        yield newComment.save();
        return res.status(201).json({ status: "success",
            date: newComment });
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