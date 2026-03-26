const db = require("../config/db");

exports.getAllCategories = (callback) => {
  db.query("SELECT * FROM categories", callback);
};

exports.createCategory = (data, callback) => {
  db.query("INSERT INTO categories SET ?", data, callback);
};