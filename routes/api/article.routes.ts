import { Router } from "express";
import isLoggedIn from "../../middlewares/checkIsLoggedIn";
import createArticle, { deleteArticle, getAllArticles, getSingleArticle } from "../../controllers/articles";
import validateArticle from "../../validations/article";


const articleRouter = Router();


// Create a new article, should be logged in and also need to check if is an admin
// validated with validateArticle to avoid incomplete data sent to this endpoint
articleRouter.post("/", isLoggedIn, validateArticle, createArticle);
  
  // Get all articles
  articleRouter.get("/", getAllArticles);
  
  // get single article
  articleRouter.get("/:id", getSingleArticle);
  
  // Delete a article by ID, should be an admin, that means has to be
  // logged in
  articleRouter.delete("/:id", isLoggedIn, deleteArticle);

export default articleRouter;
