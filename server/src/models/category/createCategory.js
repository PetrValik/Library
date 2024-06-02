const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../utils/validateDateTime.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const categoryDatabase = require("../../database/categoryDatabase.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
  },
  required: ["name"],
  additionalProperties: false,
};

async function CreateCategory(req, res) {
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
    const nameExists = categoryList.some((u) => u.name === category.name);
    if (nameExists) {
      res.status(400).json({
        code: "nameAlreadyExists",
        message: `Category with name ${category.name} already exists`,
      });
      return;
    }
    console.log("Category " + category + " was created");
    category = categoryDatabase.create(category);
    res.json(category);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateCategory;
