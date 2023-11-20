const express = require("express");
const cors = require("cors");

const connectDB = require("./config/Database");
const taskRouter = require("./Routers/taskRouter");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();
app.use("/api/tasks", taskRouter);
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
