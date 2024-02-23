import { Router } from "express";
import commentRouter from "./api/comment.routes";
import notFound from "../controllers/notFount";
import userRouter from "./api/user.routes";
import messageRouter from "./api/message.routes";


const router = Router();

// comments routes
router.use('/comments', commentRouter);

// users routes
router.use('/users', userRouter);

// messages routes
router.use('/messages', messageRouter);

// will handle all routes that do not exist
router.all("*", notFound);

export default router;