const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const categoryDatabase = require("../../database/categoryDatabase.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string", minLength: 3 },
  },
  required: ["id", "name"],
  additionalProperties: false,
};

async function UpdateCategory(req, res) {
  try {
    let category = req.body;

    // validate input
    const valid = ajv.validate(schema, category);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const categoryList = categoryDatabase.list();
    const categoryExists = categoryList.some(
      (u) => u.name === category.name && u.id !== category.id
    );
    if (categoryExists) {
      res.status(400).json({
        code: "categoryAlreadyExists",
        message: `Category with name ${category.name} already exists`,
      });
      return;
    }

    const updatedCategory = categoryDatabase.update(category);
    if (!updatedCategory) {
      res.status(404).json({
        code: "categoryNotFound",
        message: `Category ${category.id} not found`,
      });
      return;
    }

    res.json(updatedCategory);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateCategory;
