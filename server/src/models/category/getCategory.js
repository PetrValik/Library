const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDatabase = require("../../database/categoryDatabase.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetCategory(req, res) {
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
    const category = categoryDatabase.get(reqParams.id);
    if (!category) {
      res.status(404).json({
        code: "categoryNotFound",
        message: `Category ${reqParams.id} not found`,
      });
      return;
    }

    res.json(category);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetCategory;
