const express = require("express");
const router = express.Router();
const controller = require("../controllers/productController");
const auth = require("../middleware/auth");
const upload = require("../config/upload");

router.get("/:categoryId", controller.getProducts);

router.delete("/:id", auth, controller.deleteProduct);


router.post("/", auth, upload.single("image"), controller.addProduct);
router.put("/:id", auth, upload.single("image"), controller.updateProduct);

module.exports = router;