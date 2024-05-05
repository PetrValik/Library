const categoryDatabase = require("../../database/categoryDatabase.js");

async function ListCategory(req, res) {
  try {
    const categoryList = categoryDatabase.list();
    res.json(categoryList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListCategory;
