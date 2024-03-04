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
exports.likeOrDislike = exports.updateArticle = exports.deleteArticle = exports.getSingleArticle = exports.getAllArticles = void 0;
const articleModel_1 = __importDefault(require("../model/articleModel"));
const likeModel_1 = __importDefault(require("../model/likeModel"));
// controller to create an article
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newArticle = new articleModel_1.default(Object.assign({}, req.body));
        const saved = yield newArticle.save();
        return res.status(201).json({ status: "success",
            Article: saved });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// controller to get all articles
const getAllArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allArticles = yield articleModel_1.default.find();
        if (allArticles.length > 0) {
            return res.status(200).json({ ststus: "success", articles: allArticles });
        }
        else {
            return res.status(404).json({ message: "No article found" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getAllArticles = getAllArticles;
// get single article controller
const getSingleArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const article = yield articleModel_1.default.findById(id);
        if (article) {
            return res.status(200).json({ message: "Article found", deta: article });
        }
        else {
            return res.status(404).json({ message: "Article not found or invalid article ID" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getSingleArticle = getSingleArticle;
// Delete a article controller
const deleteArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedArticle = yield articleModel_1.default.findByIdAndDelete(id);
        if (deletedArticle) {
            return res.status(200).json({ message: "Article found and successfully deleted", data: deletedArticle });
        }
        else {
            return res.status(404).json({ message: "Article not found or invalid message ID and not deleted" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.deleteArticle = deleteArticle;
const updateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, image } = req.body;
        const article = yield articleModel_1.default.findById(id);
        if (!article)
            return res.status(404).json({ message: "Article not found or invalid message ID and not deleted" });
        if (title) {
            article.title = title;
        }
        if (description) {
            article.description = description;
        }
        if (image) {
            article.image = image;
        }
        const updateArticle = yield article.save();
        return res.status(200).json({ status: "success",
            Article: updateArticle });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.updateArticle = updateArticle;
// controller to like or dislike an article
const likeOrDislike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { articleId } = req.params;
        const userId = req.user._id;
        const existArticle = yield articleModel_1.default.findById(articleId);
        if (!existArticle) {
            return res.status(404).json({ error: "Article not found!" });
        }
        const existLike = yield likeModel_1.default.findOne({ Article: articleId, user: userId });
        if (!existLike) {
            const like = new likeModel_1.default({
                article: articleId,
                user: userId,
            });
            const savedLike = yield like.save();
            yield articleModel_1.default.updateOne({ _id: existArticle._id }, { $push: { likes: savedLike._id } }, { new: true });
            const articleLikes = yield likeModel_1.default.find({ article: existArticle._id });
            return res.status(200).json({
                status: "Article liked",
                likes: articleLikes,
            });
        }
        yield articleModel_1.default.updateOne({ _id: existArticle._id }, {
            $pull: {
                likes: existLike._id,
            },
        });
        yield likeModel_1.default.deleteOne({ _id: existLike._id });
        const articleLikes = yield likeModel_1.default.find({ article: existArticle._id });
        return res.status(200).json({ status: "Article disliked", likes: articleLikes });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.likeOrDislike = likeOrDislike;
exports.default = createArticle;
//# sourceMappingURL=articles.js.map