const express = require("express");
const router = express.Router();

const GetCategory = require("../models/category/getCategory");
const ListCategories = require("../models/category/listCategory");
const CreateCategory = require("../models/category/createCategory");
const UpdateCategory = require("../models/category/updateCategory");
const DeleteCategory = require("../models/category/deleteCategory");

router.get("/get", GetCategory);
router.get("/list", ListCategories);
router.post("/create", CreateCategory);
router.post("/update", UpdateCategory);
router.post("/delete", DeleteCategory);

module.exports = router;
