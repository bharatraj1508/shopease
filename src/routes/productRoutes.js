const express = require("express");

const router = express.Router();

const {
  addProduct,
  updateProduct,
  viewProduct,
  productList,
  deleteProduct,
} = require("../controllers/productController");
const passport = require("passport");

router.use(passport.initialize());
require("../utils/passport");
const authenticate = passport.authenticate("jwt", { session: false });

router.use(authenticate);

router.post("/product/add", addProduct);
router.put("/product/update", updateProduct);
router.get("/product/:id", viewProduct);
router.get("/products", productList);
router.delete("/product/:id", deleteProduct);

module.exports = router;
