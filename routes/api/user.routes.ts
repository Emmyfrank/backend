import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  registerUser,
} from "../../controllers/user";
import isLoggedIn from "../../middlewares/checkIsLoggedIn";
import validateRegister, { validateLogin } from "../../validations/user";

const userRouter = Router();

// Get all users /api/v1/users
userRouter.get("/", isLoggedIn, getAllUsers);

// Register a new user
userRouter.post("/register", validateRegister, registerUser);

// Get single user by ID
userRouter.get("/:id", isLoggedIn, getSingleUser);

// Delete user by ID
userRouter.delete("/:id", isLoggedIn, deleteUser);

// User login route
userRouter.post("/login", validateLogin, loginUser);

export default userRouter;
