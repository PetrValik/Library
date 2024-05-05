const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

const userController = require("./src/controllers/user");
const bookController = require("./src/controllers/book");
const reviewController = require("./src/controllers/review");
const categoryController = require("./src/controllers/category");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.use(cors());

app.get("/", (req, res) => {
  res.send("We started");
});

app.use("/book", bookController);
app.use("/user", userController);
app.use("/review", reviewController);
app.use("/category", categoryController);

app.listen(port, () => {
  console.log(`library app listening on port ${port}`);
});
