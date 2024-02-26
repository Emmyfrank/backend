import { Request, Response } from 'express';
import User from '../model/userModel';
import jwt from 'jsonwebtoken';

// get all users controller
export const getAllUsers = async (req:Request, res:Response) => {
  try {
    const users = await User.find();

    if (users.length > 0) {
      return res.status(200).json(users);
    } else {
      return res.status(404).json({ message: "No users found in your database" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

  // create or register user controller
  export const registerUser = async (req:Request, res:Response) => {
    const { password, email, username, name } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      
      if (existingUser) {
        return res.status(409).json({ message: "Email already taken" });
      }
  
      const newUser = new User({ password, email, username, name });
      const user = await newUser.save();
      return res.status(201).json(user);
    } catch (error) {
      console.error("Error in user registration:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // get single user controller
  export const getSingleUser = async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (user) {
        return res.status(200).json({ message: "User found", user });
      } else {
        return res.status(404).json({ message: "User not found or invalid user ID" });
      }
    } catch (error) {
      console.error(error);      
      return res.status(500).json({ message: "Internal server error" });
    }
  };

    // Delete user controller
    export const deleteUser = async (req:Request, res:Response) => {
      const { id } = req.params;
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
          return res.status(200).json({ message: "User found and successfully deleted", deletedUser });
        } else {
          return res.status(404).json({ message: "User not found or invalid user ID and not deleted" });
        }
      } catch (error:any) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
      }
    };

    // login/signin a user controller
    export const loginUser = async (req:Request, res:Response) => {
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
        console.error(error);
        res.status(500).json({ message: "Internal server error",error:`${error}`});
      }
    };