const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken")

dotenv.config();

const app = express();

const Mess = require("./model/messageModel");
const User = require("./model/userModel");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Welcome route
app.get("/", (req, res) => res.send("Welcome home"));

//getting all users from database
app.get("/api/users",async(req,res)=>{
  try {
    const users = await User.find()

    if(users.length >0) {
      res.status(200).json(users)
    } else {
      res.status(404).json({messsage:"no users found in yoiur database"})
    }
  } catch (error) {
    res.status(500).json(error.message)
  }
})

// to registration a new user  route
app.post("/api/users/register", async (req, res) => {
  try {
    const newUser = new User({ ...req.body });
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// User login route
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"30d"})

    res.status(200).json({ message: "Login successful", user,token });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Messages route
app.post("/api/messages", async (req, res) => {
  try {
    const newMessage = new Mess({ ...req.body });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGOSB_URL)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(
        `Successfully connected to the database, and the server is running on port ${process.env.PORT}`
      )
    );
  })
  .catch((error) => {
    console.log(`Failed to connect to the database: `, error.message);
  });
