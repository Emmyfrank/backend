import { Router } from "express";
import isLoggedIn from "../../middlewares/checkIsLoggedIn";
import createArticle, { deleteArticle, getAllArticles, getSingleArticle, likeOrDislike, updateArticle } from "../../controllers/articles";
import validateArticle, { validateUpdateArticle } from "../../validations/article";
import isAdmin from "../../middlewares/isAdmin";


const articleRouter = Router();


// Create a new article, should be logged in and also need to check if is an admin
// validated with validateArticle to avoid incomplete data sent to this endpoint
articleRouter.post("/", isLoggedIn, isAdmin, validateArticle, createArticle);
  
  // Get all articles
  articleRouter.get("/", getAllArticles);
  
  // get single article
  articleRouter.get("/:id", getSingleArticle);
  
  // Delete a article by ID, should be an admin, that means has to be
  // logged in
  articleRouter.delete("/:id", isLoggedIn, isAdmin, deleteArticle);

  // Update article should be an admin, that means has to be logged in
  articleRouter.patch("/:id", isLoggedIn, isAdmin, validateUpdateArticle, updateArticle);

  // like or dislike article
  articleRouter.post("/:articleId", isLoggedIn,  likeOrDislike);

export default articleRouter;
