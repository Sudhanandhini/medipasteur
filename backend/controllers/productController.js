const Product = require("../models/productModel");

exports.getAllProducts = (req, res) => {
  Product.getAllProducts((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getProductById = (req, res) => {
  Product.getProductById(req.params.id, (err, result) => {
    if (err) return res.status(500).json(err);
    if (!result.length) return res.status(404).json({ message: "Not found" });
    res.json(result[0]);
  });
};

exports.getProductsBySlug = (req, res) => {
  Product.getProductsByCategorySlug(req.params.slug, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getProducts = (req, res) => {
  const categoryId = req.params.categoryId;

  Product.getProductsByCategory(categoryId, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.addProduct = (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, sku, description, sub_category, composition, pack_size, indication, specification } = req.body;

    if (!name || !sku) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const data = {
      name,
      sku,
      description,
      sub_category: sub_category || null,
      composition: composition || null,
      pack_size: pack_size || null,
      indication: indication || null,
      specification: specification || null,
      category_id: req.body.category_id || null,
      image: req.file ? req.file.filename : null,
    };

    Product.createProduct(data, (err) => {
      if (err) {
        console.error("DB ERROR:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "Product added successfully" });
    });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
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