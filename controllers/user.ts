import { Request, Response } from 'express';
import User from '../model/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// get all users controller
export const getAllUsers = async (req:Request, res:Response) => {
  try {
    const users = await User.find();

    if (users.length > 0) {
      return res.status(200).json({message: "success",data: users});
    } else {
      return res.status(404).json({ message: "No users found in your database" });
    }
  } catch (error:any) {
    console.log(error);
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
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(409).json({ message: "username is taken" });
      }
      const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_NUMBER));
  
      const newUser = new User({ password: hashedPassword, email, username, name });
      const user = await newUser.save();
      return res.status(201).json(user);
    } catch (error) {
      console.log("Error in user registration:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  // get single user controller
  export const getSingleUser = async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (user) {
        return res.status(200).json({ message: "User found", data: user });
      } else {
        return res.status(404).json({ message: "User not found or invalid user ID" });
      }
    } catch (error) {
      console.log(error);      
      return res.status(500).json({ message: "Internal server error" });
    }
  };

    // Delete user controller
    export const deleteUser = async (req:Request, res:Response) => {
      const { id } = req.params;
      try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (deletedUser) {
          return res.status(200).json({ message: "User found and successfully deleted", data: deletedUser });
        } else {
          return res.status(404).json({ message: "User not found or invalid user ID and not deleted" });
        }
      } catch (error:any) {
        console.log(error);
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

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    
        if (!isPasswordCorrect) {
          return res.status(401).json({ message: "Invalid password" });
        }
    
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: "30d" });
    
        res.status(200).json({ message: "Login successful", user, token });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error",error:`${error}`});
      }
    };

    export const assignRoleToUser = async (req: Request, res: Response) => {
      try {
        const { role, userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: "User not found or invalid user ID" });
        }
        user.role = role;
        const updatedUser = await user.save();

      return res.status(200).json({ message: "user updated successfully", user: updatedUser });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error:`${error}`});
      }  
    };