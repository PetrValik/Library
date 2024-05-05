const express = require("express");
const router = express.Router();

const GetReview = require("../models/review/getReview");
const ListReviews = require("../models/review/listReview");
const CreateReview = require("../models/review/createReview");
const UpdateReview = require("../models/review/updateReview");
const DeleteReview = require("../models/review/deleteReview");

router.get("/get", GetReview);
router.get("/list", ListReviews);
router.post("/create", CreateReview);
router.post("/update", UpdateReview);
router.post("/delete", DeleteReview);

module.exports = router;
