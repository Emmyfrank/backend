import { Request, Response } from "express";

import express from "express";
// const mongoose = require("mongoose");
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

import Mess from "./model/messageModel";
import User from "./model/userModel";
import {Comment} from "./model/commentModel";
import mongoose from "mongoose";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Welcome route
app.get("/", (req:Request, res:Response) => res.send("Welcome home"));

// comment section starts here

// Create a new comment
app.post("/api/comments", async (req:Request, res:Response) => {
  try {
    const newComment = new Comment({ ...req.body });
    await newComment.save();
    res.status(201).json(
      {status: "success",
    date: newComment});
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all comment
app.get("/api/comments", async (req:Request, res:Response) => {
  try {
    const allComments = await Comment.find();
    if (allComments.length > 0) {
      res.status(200).json(allComments);
    } else {
      res.status(404).json({ message: "No Comment found in database" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// get single comment by ID


app.get("/api/comments/:id", async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findById(id);
    if (comment) {
      res.status(200).json({ message: "Comment found", comment });
    } else {
      res.status(404).json({ message: "Comment not found or invalid user ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a comment by ID
app.delete("/api/comments/:id", async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (deletedComment) {
      res.status(200).json({ message: "Comment found and successfully deleted", deletedComment });
    } else {
      res.status(404).json({ message: "Comment not found or invalid message ID and not deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


// comment section ends here

// Get all users
app.get("/api/users", async (req:Request, res:Response) => {
  try {
    const users = await User.find();

    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "No users found in your database" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

// Register a new user
app.post("/api/users/register", async (req:Request, res:Response) => {
  const { password, email, username, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(401).json({ message: "Email already taken" });
    }

    const newUser = new User({ password, email, username, name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get single user by ID
app.get("/api/users/:id", async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({ message: "User found", user });
    } else {
      res.status(404).json({ message: "User not found or invalid user ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete user by ID
app.delete("/api/users/:id", async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      res.status(200).json({ message: "User found and successfully deleted", deletedUser });
    } else {
      res.status(404).json({ message: "User not found or invalid user ID and not deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// User login route
app.post("/api/users/login", async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "30d" });

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Auto-login user route
app.post("/api/user/verify-token", async (req:Request, res:Response) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  } else {
    return res.status(401).json({ message: "You need to sign in" });
  }

  try {
    // const decoded = jwt.verify(token, );
    
    jwt.verify(token, String(process.env.JWT_SECRET), async function(err, decoded) {
      if(err) return res.status(401).json({ message: "Invalid token" });
      const user = await User.findById(decoded.userId);
      if (user) {
        res.status(200).json({ message: "Token verification successful", user });
      } else {
        res.status(401).json({ message: "Token expired" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Create a new message
app.post("/api/messages", async (req:Request, res:Response) => {
  try {
    const newMessage = new Mess({ ...req.body });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all messages
app.get("/api/messages", async (req:Request, res:Response) => {
  try {
    const allMessages = await Mess.find();
    if (allMessages.length > 0) {
      res.status(200).json(allMessages);
    } else {
      res.status(404).json({ message: "No messages found in database" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// get single message

app.get("/api/messages/:id", async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const message = await Mess.findById(id);
    if (message) {
      res.status(200).json({ message: "Message found", Message: message });
    } else {
      res.status(404).json({ message: "Message not found or invalid user ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a message by ID
app.delete("/api/messages/:id", async (req:Request, res:Response) => {
  const { id } = req.params;
  try {
    const deletedMessage = await Mess.findByIdAndDelete(id);
    if (deletedMessage) {
      res.status(200).json({ message: "Message found and successfully deleted", deletedMessage });
    } else {
      res.status(404).json({ message: "Message not found or invalid message ID and not deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
//this

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGOSB_URL as string)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Successfully connected to the database, and the server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error: any) => {
    console.log(`Failed to connect to the database: ${error.message}`);
  });
  