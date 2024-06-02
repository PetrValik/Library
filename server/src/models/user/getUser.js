const Ajv = require("ajv");
const ajv = new Ajv();

const userDatabase = require("../../database/userDatabase.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string"},
  },
  required: ["name"],
  additionalProperties: false,
};

async function GetUser(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.name ? req.query : req.body;

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

    // read user by given id
    const user = userDatabase.get(reqParams.name);
    if (!user) {
      res.status(404).json({
        code: "userNotFound",
        message: `User ${reqParams.id} not found`,
      });
      return;
    }

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetUser;
