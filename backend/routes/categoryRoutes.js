const express = require("express");
const router = express.Router();
const controller = require("../controllers/categoryController");

router.get("/", controller.getCategories);
router.post("/", controller.addCategory);

module.exports = router;