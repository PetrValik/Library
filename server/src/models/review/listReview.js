const reviewDatabase = require("../../database/reviewDatabase.js");

async function ListReview(req, res) {
  try {
    const reviewList = reviewDatabase.list();
    res.json(reviewList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListReview;
