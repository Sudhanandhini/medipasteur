const Category = require("../models/categoryModel");

exports.getCategories = (req, res) => {
  Category.getAllCategories((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.addCategory = (req, res) => {
  Category.createCategory(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Category added", result });
  });
};