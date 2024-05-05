const userDatabase = require("../../database/userDatabase.js");

async function ListUser(req, res) {
  try {
    const userList = userDatabase.list();
    res.json(userList);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListUser;
