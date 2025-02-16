const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();
const { getAsync, setAsync } = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  console.log("✅ New todo added. Attempting to update Redis...");

  const currentCount = parseInt(await getAsync("added_todos")) || 0;
  console.log("🟡 Current count in Redis before update:", currentCount);

  const newCount = currentCount + 1;
  console.log("🟢 Storing new count in Redis:", newCount);

  await setAsync("added_todos", newCount);
  console.log("✅ Redis counter updated successfully!");

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const updateData = req.body;
  const updatedTodo = await Todo.findByIdAndUpdate(req.todo._id, updateData, {
    new: true,
  });
  if (!updateData) {
    return res.status(404).json({ error: "Todo not found" });
  }
  res.json(updatedTodo);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
