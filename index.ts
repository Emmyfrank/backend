import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();

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
  