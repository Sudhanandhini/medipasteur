const db = require("../config/db");

exports.getProductsByCategory = (categoryId, callback) => {
  db.query(
    "SELECT * FROM products WHERE category_id = ?",
    [categoryId],
    callback
  );
};

exports.createProduct = (data, callback) => {
  db.query("INSERT INTO products SET ?", data, callback);
};

exports.updateProduct = (id, data, callback) => {
  db.query("UPDATE products SET ? WHERE id = ?", [data, id], callback);
};

exports.deleteProduct = (id, callback) => {
  db.query("DELETE FROM products WHERE id = ?", [id], callback);
};