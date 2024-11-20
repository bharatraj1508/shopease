const mongoose = require("mongoose");
const Product = mongoose.model("Product");

const { productSchema } = require("../utils/validationSchema");

const addProduct = async (req, res) => {
  try {
    const sanitized = await productSchema.validateAsync(req.body);

    const product = await new Product({
      name: sanitized.name,
      description: sanitized.description,
      price: sanitized.price,
      owner: req.user._id,
    }).save();

    res.status(200).send({
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    if (err.isJoi === true) {
      return res.status(422).send({ error: err });
    }
    res.status(500).send({ error: err });
  }
};

const updateProduct = async (req, res) => {
  try {
    const sanitized = await productSchema.validateAsync(req.body);
    const product = await Product.findByIdAndUpdate(req.params.id, sanitized, {
      new: true,
    });

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.status(200).send({
      message: "Product updated successfully",
      product,
    });
  } catch (err) {
    if (err.isJoi === true) {
      return res.status(422).send({ error: err });
    }
    res.status(500).send({ error: err });
  }
};

const viewProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.status(200).send(product);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const productList = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    res.status(200).send({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  viewProduct,
  productList,
  deleteProduct,
};
