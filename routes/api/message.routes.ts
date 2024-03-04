import { Router } from "express";
import { createMessage, deleteMessage, getAllMessages, getSingleMessage } from "../../controllers/message";
import isLoggedIn from "../../middlewares/checkIsLoggedIn";
import validateMessage from "../../validations/message";
import isAdmin from "../../middlewares/isAdmin";


const messageRouter = Router();


// Create a new message
messageRouter.post("/", validateMessage, createMessage);
  
  // Get all messages
  messageRouter.get("/", isLoggedIn, isAdmin, getAllMessages);
  
  // get single message
  messageRouter.get("/:id", isLoggedIn, getSingleMessage);
  
  // Delete a message by ID
  messageRouter.delete("/:id", isLoggedIn, isAdmin, deleteMessage);

export default messageRouter;
