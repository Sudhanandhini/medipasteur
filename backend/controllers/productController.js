const Product = require("../models/productModel");

exports.getProducts = (req, res) => {
  const categoryId = req.params.categoryId;

  Product.getProductsByCategory(categoryId, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.addProduct = (req, res) => {
  const data = {
    ...req.body,
    image: req.file ? req.file.filename : null,
  };

  Product.createProduct(data, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product added" });
  });
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;

  const data = {
    ...req.body,
  };

  if (req.file) data.image = req.file.filename;

  Product.updateProduct(id, data, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Updated" });
  });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  Product.deleteProduct(id, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Product deleted" });
  });
};