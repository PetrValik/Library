const Ajv = require("ajv");
const ajv = new Ajv();

const reviewDatabase = require("../../database/reviewDatabase.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetReview(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // read category by given id
    const review = reviewDatabase.get(reqParams.id);
    if (!review) {
      res.status(404).json({
        code: "reviewNotFound",
        message: `Review ${reqParams.id} not found`,
      });
      return;
    }

    res.json(review);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetReview;
