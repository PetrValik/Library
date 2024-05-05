const express = require("express");
const router = express.Router();

const GetBook = require("../models/book/getBook");
const ListBooks = require("../models/book/listBook");
const CreateBook = require("../models/book/createBook");
const UpdateBook = require("../models/book/updateBook");
const DeleteBook = require("../models/book/deleteBook");

router.get("/get", GetBook);
router.get("/list", ListBooks);
router.post("/create", CreateBook);
router.post("/update", UpdateBook);
router.post("/delete", DeleteBook);

module.exports = router;
