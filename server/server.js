
import dotenv from "dotenv";

const result = dotenv.config();

console.log(result);

import app from "./app.js";
import connectDB from "./config/database.js";
console.log("Current Directory:", process.cwd());

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error(error);
  }
}

startServer();