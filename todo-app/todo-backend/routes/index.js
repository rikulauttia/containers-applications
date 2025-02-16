const express = require("express");
const redis = require("../redis");
const router = express.Router();
const { getAsync } = require("../redis");
const configs = require("../util/config");
require("dotenv").config();
console.log("✅ REDIS_URL:", process.env.REDIS_URL);

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (req, res) => {
  const addedTodos = (await getAsync("added_todos")) || 0;
  console.log("DEBUG: Redis added_todos =", addedTodos);
  res.json({ added_todos: parseInt(addedTodos) });
});

module.exports = router;
