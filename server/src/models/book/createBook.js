const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const validateDateTime = require("../../utils/validateDateTime.js");
ajv.addFormat("date-time", { validate: validateDateTime });

const bookDatabase = require("../../database/bookDatabase.js");

const schema = {
  type: "object",
  properties: {
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

async function CreateBook(req, res) {
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
    const bookExists = bookList.some((u) => u.name === book.name);
    if (bookExists) {
      res.status(400).json({
        code: "bookAlreadyExists",
        message: `Book with name ${book.name} already exists`,
      });
      return;
    }

    book = bookDatabase.create(book);
    res.json(book);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateBook;
