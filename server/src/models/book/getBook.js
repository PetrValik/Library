const Ajv = require("ajv");
const ajv = new Ajv();

const bookDatabase = require("../../database/bookDatabase.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetBook(req, res) {
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

    // read book by given id
    const book = bookDatabase.get(reqParams.id);
    if (!book) {
      res.status(404).json({
        code: "bookNotFound",
        message: `Book ${reqParams.id} not found`,
      });
      return;
    }

    res.json(book);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetBook;
