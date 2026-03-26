const db = require("../config/db");

exports.getAllProducts = (callback) => {
  db.query("SELECT * FROM products ORDER BY created_at DESC", callback);
};

exports.getProductById = (id, callback) => {
  db.query("SELECT * FROM products WHERE id = ?", [id], callback);
};

exports.getProductsByCategorySlug = (slug, callback) => {
  db.query(
    "SELECT p.* FROM products p JOIN categories c ON p.category_id = c.id WHERE c.slug = ? ORDER BY p.id ASC",
    [slug],
    callback
  );
};

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