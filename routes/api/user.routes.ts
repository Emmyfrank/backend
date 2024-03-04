import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  registerUser,
  assignRoleToUser,
} from "../../controllers/user";
import isLoggedIn from "../../middlewares/checkIsLoggedIn";
import validateRegister, { validateLogin, validateRole } from "../../validations/user";
import isAdmin from "../../middlewares/isAdmin";

const userRouter = Router();

// Get all users /api/v1/users
userRouter.get("/", isLoggedIn, isAdmin, getAllUsers);

// Register a new user
userRouter.post("/register", validateRegister, registerUser);

// Get single user by ID
userRouter.get("/:id", isLoggedIn, getSingleUser);

// Delete user by ID
userRouter.delete("/:id", isLoggedIn, isAdmin, deleteUser);

// User login route
userRouter.post("/login", validateLogin, loginUser);
userRouter.patch("/assign-role", isLoggedIn, isAdmin, validateRole, assignRoleToUser);

export default userRouter;
