import { Router } from "express";
import createComment, {
  deleteComment,
  getAllComments,
  getSingleComment,
} from "../../controllers/comments";
import isLoggedIn from "../../middlewares/checkIsLoggedIn";
import validateComment from "../../validations/comment";

const commentRouter = Router();

// a route to create a comment via endpoint api/v1/comments
commentRouter.post("/", isLoggedIn, validateComment, createComment);

// Get all comment via endpoint api/v1/comments
commentRouter.get("/", getAllComments);

// get single comment by ID
commentRouter.get("/:id", getSingleComment);

// Delete a comment by ID
commentRouter.delete("/:id", isLoggedIn, deleteComment);

export default commentRouter;
