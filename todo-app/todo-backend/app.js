require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const todosRouter = require("./routes/todos");

const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());

console.log("Loaded ENV Variables:");
console.log("MONGO_URL:", process.env.MONGO_URL);
console.log("REDIS_URL:", process.env.REDIS_URL);

app.use("/", indexRouter);
app.use("/todos", todosRouter);

module.exports = app;
