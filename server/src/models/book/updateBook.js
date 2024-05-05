const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const bookDatabase = require("../../database/bookDatabase.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
    name: { type: "string", minLength: 3 },
    author: { type: "array", items: 
    {
      type: "string", "minLength": 3
    }
  },
    pages: { type: "int"},
    reelaseDate: { type: "int"},
    Description: { type: "string", minLength: 3 },
    categories: { type: "array", items: 
      {
        type: "string", minLength: 32, maxLength: 32 
      }
    },
  },
  required: ["name", "author"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let book = req.body;

    // validate input
    const valid = ajv.validate(schema, book);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const bookList = bookDatabase.list();
    const nameExists = bookList.some(
      (u) => u.name === book.name && u.id !== book.id
    );
    if (nameExists) {
      res.status(400).json({
        code: "nameAlreadyExists",
        message: `Book with name ${book.name} already exists`,
      });
      return;
    }

    const updatedBook = bookDatabase.update(book);
    if (!updatedBook) {
      res.status(404).json({
        code: "bookNotFound",
        message: `Book ${book.id} not found`,
      });
      return;
    }

    res.json(updatedBook);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
