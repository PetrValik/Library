const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const bookFolderPath = path.join(__dirname, "storage", "bookDatabase");

// Method to read an book from a file
function get(bookId) {
  try {
    const filePath = path.join(bookFolderPath, `${bookId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadBook", message: error.message };
  }
}

// Method to write an book to a file
function create(book) {
  try {
    book.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(bookFolderPath, `${book.id}.json`);
    const fileData = JSON.stringify(book);
    fs.writeFileSync(filePath, fileData, "utf8");
    return book;
  } catch (error) {
    throw { code: "failedToCreateBook", message: error.message };
  }
}

// Method to update book in a file
function update(book) {
  try {
    const currentBook = get(book.id);
    if (!currentBook) return null;
    const newBook = { ...currentBook, ...book };
    const filePath = path.join(bookFolderPath, `${book.id}.json`);
    const fileData = JSON.stringify(newBook);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newBook;
  } catch (error) {
    throw { code: "failedToUpdateBook", message: error.message };
  }
}

// Method to remove an book from a file
function remove(book) {
  try {
    const filePath = path.join(bookFolderPath, `${book}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") return {};
    throw { code: "failedToRemoveBook", message: error.message };
  }
}

// Method to list books in a folder
function list() {
  try {
    const files = fs.readdirSync(bookFolderPath);
    const bookList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(bookFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    bookList.sort((a, b) => {
      if (a.name < b.name) {
          return -1;
      }
      if (a.name > b.name) {
          return 1;
      }
      return 0;
  });
    return bookList;
  } catch (error) {
    throw { code: "failedToListBooks", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
