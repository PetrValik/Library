const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const reviewFolderPath = path.join(__dirname, "storage", "reviewDatabase");

// Method to read an review from a file
function get(reviewId) {
  try {
    const filePath = path.join(reviewFolderPath, `${reviewId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadReview", message: error.message };
  }
}

// Method to write an review to a file
function create(review) {
  try {
    review.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(reviewFolderPath, `${review.id}.json`);
    const fileData = JSON.stringify(review);
    fs.writeFileSync(filePath, fileData, "utf8");
    return review;
  } catch (error) {
    throw { code: "failedToCreateReview", message: error.message };
  }
}

// Method to update review in a file
function update(review) {
  try {
    const currentReview = get(review.id);
    if (!currentReview) return null;
    const newReview = { ...currentReview, ...review };
    const filePath = path.join(reviewFolderPath, `${review.id}.json`);
    const fileData = JSON.stringify(newReview);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newReview;
  } catch (error) {
    throw { code: "failedToUpdateReview", message: error.message };
  }
}

// Method to remove an review from a file
function remove(reviewId) {
  try {
    const filePath = path.join(reviewFolderPath, `${reviewId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveReview", message: error.message };
  }
}

// Method to list reviews in a folder
function list() {
  try {
    const files = fs.readdirSync(reviewFolderPath);
    const reviewList = files.map((file) => {
      const fileData = fs.readFileSync(path.join(reviewFolderPath, file), "utf8");
      return JSON.parse(fileData);
    });
    return reviewList;
  } catch (error) {
    throw { code: "failedToListReviews", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
