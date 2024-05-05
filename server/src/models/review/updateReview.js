const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const reviewDatabase = require("../../database/reviewDatabase.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    text: { type: "string" },
  },
  required: ["id", "text"],
  additionalProperties: false,
};

async function UpdateReview(req, res) {
  try {
    let review = req.body;

    // validate input
    const valid = ajv.validate(schema, review);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const updatedReview = reviewDatabase.update(review);
    if (!updatedReview) {
      res.status(404).json({
        code: "reviewNotFound",
        message: `review ${review.id} not found`,
      });
      return;
    }

    res.json(updatedReview);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateReview;
