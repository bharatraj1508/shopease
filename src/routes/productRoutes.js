const express = require("express");

const router = express.Router();

const {
  addProduct,
  updateProduct,
  viewProduct,
  productList,
  deleteProduct,
} = require("../controllers/productController");

router.post("/product/add", addProduct);
router.put("/product/update", updateProduct);
router.get("/product/:id", viewProduct);
router.get("/products", productList);
router.delete("/product/:id", deleteProduct);

module.exports = router;
