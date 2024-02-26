import { Router } from "express";
import commentRouter from "./api/comment.routes";
import notFound from "../controllers/notFount";
import userRouter from "./api/user.routes";
import messageRouter from "./api/message.routes";
import articleRouter from "./api/article.routes";


const router = Router();

// comments routes
router.use('/comments', commentRouter);

// users routes
router.use('/users', userRouter);

// messages routes
router.use('/messages', messageRouter);

// articles routes
router.use('/articles', articleRouter);


export default router;