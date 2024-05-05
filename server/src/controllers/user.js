const express = require("express");
const router = express.Router();

const GetUser = require("../models/user/getUser");
const ListUsers = require("../models/user/listUser");
const CreateUser = require("../models/user/createUser");
const UpdateUser = require("../models/user/updateUser");
const DeleteUser = require("../models/user/deleteUser");

router.get("/get", GetUser);
router.get("/list", ListUsers);
router.post("/create", CreateUser);
router.post("/update", UpdateUser);
router.post("/delete", DeleteUser);

module.exports = router;
