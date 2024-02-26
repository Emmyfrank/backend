import { Router } from "express";
import { createMessage, deleteMessage, getAllMessages, getSingleMessage } from "../../controllers/message";
import isLoggedIn from "../../middlewares/checkIsLoggedIn";
import validateMessage from "../../validations/message";


const messageRouter = Router();


// Create a new message
messageRouter.post("/", validateMessage, createMessage);
  
  // Get all messages
  messageRouter.get("/", isLoggedIn, getAllMessages);
  
  // get single message
  messageRouter.get("/:id", isLoggedIn, getSingleMessage);
  
  // Delete a message by ID
  messageRouter.delete("/:id", isLoggedIn, deleteMessage);

export default messageRouter;
