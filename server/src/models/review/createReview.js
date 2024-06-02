const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../utils/validateDateTime.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const reviewDatabase = require("../../database/reviewDatabase.js");

const schema = {
  type: "object",
  properties: {
    bookId: { type: "string", minLength: 32, maxLength: 32 },
    userId: { type: "string", minLength: 32, maxLength: 32 },
    text: { type: "string"},
  },
  required: ["bookId", "userId", "text"],
  additionalProperties: false,
};

async function CreateReview(req, res) {
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

    console.log("Review " + review + " was created");
    review = reviewDatabase.create(review);
    res.json(review);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateReview;
