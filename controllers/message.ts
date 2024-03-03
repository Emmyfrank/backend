import { Request, Response } from 'express';
import Mess from '../model/messageModel';

// get all messages controller
export const getAllMessages = async (req:Request, res:Response) => {
  try {
    const allMessages = await Mess.find();
    if (allMessages.length > 0) {
      return res.status(200).json({message:"success",messages: allMessages});
    } else {
      return res.status(404).json({ message: "No messages found in database" });
    }
  } catch (error) {
      console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

  // create new message controller
  export const createMessage = async (req:Request, res:Response) => {
    try {
      const newMessage = new Mess({ ...req.body });
      const saved = await newMessage.save();
      return res.status(201).json({message:"success",data:saved});
    } catch (error) {
        console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // get single message controller
  export const getSingleMessage = async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
      const message = await Mess.findById(id);
      if (message) {
        return res.status(200).json({ message: "Message found", data: message });
      } else {
        return res.status(404).json({ message: "Message not found or invalid user ID" });
      }
    } catch (error) {
        console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

    // Delete message controller
    export const deleteMessage = async (req:Request, res:Response) => {
      const { id } = req.params;
      try {
        const deletedMessage = await Mess.findByIdAndDelete(id);
        if (deletedMessage) {
          return res.status(200).json({ message: "Message found and successfully deleted", data: deletedMessage });
        } else {
          return res.status(404).json({ message: "Message not found or invalid message ID and not deleted" });
        }
      } catch (error) {
          console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    };