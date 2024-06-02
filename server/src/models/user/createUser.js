const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../utils/validateDateTime.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const userDatabase = require("../../database/userDatabase.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3 },
    surname: { type: "string", minLength: 3 },
    email: { type: "string", format: "email" }
  },
  required: ["name", "surname","email"],
  additionalProperties: false,
};

async function CreateUser(req, res) {
  try {
    let user = req.body;
    console.log(`user created try`);
    // validate input
    const valid = ajv.validate(schema, user);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const userList = userDatabase.list();
    const emailExists = userList.some((u) => u.email === user.email);
    if (emailExists) {
      res.status(400).json({
        code: "emailAlreadyExists",
        message: `User with email ${user.email} already exists`,
      });
      return;
    }

    user = userDatabase.create(user);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateUser;
