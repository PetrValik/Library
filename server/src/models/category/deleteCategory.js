const Ajv = require("ajv");
const ajv = new Ajv();

const categoryDatabase = require("../../database/categoryDatabase.js");
const bookDatabase = require("../../database/bookDatabase.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteCategory(req, res) {
  try {
    // get request query or body
    const reqParams = req.body;

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

    const bookMap = bookDatabase.categoryMap();
    if (bookMap[reqParams.id]) {
      res.status(400).json({
        code: "categoryInBooks",
        message: `Category ${reqParams.id} has books`,
      });
      return;
    }
    categoryDatabase.remove(reqParams.id);

    res.json({});
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteCategory;
