const bookDatabase = require("../../database/bookDatabase.js");

async function Listbook(req, res) {
  try {
    const bookList = bookDatabase.list();
    res.json(bookList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = Listbook;
