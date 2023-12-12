// Import required modules
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Connection from "./database/db.js";
import routes from "./views/views.js";

dotenv.config();

// Create an instance of the Express app
const app = express();

// Database Connection
Connection();

// Enable JSON parsing
app.use(express.json());

// Enable cross-origin resource sharing
app.use(cors());

app.use("/", routes);

const PORT = process.env.port || 8080

// Set the server to listen on port 8000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
