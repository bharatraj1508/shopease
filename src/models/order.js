const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: [String],
    required: true,
    enum: ["pending", "confirmed", "canceled", "declined"],
    default: ["pending"],
  },
});

mongoose.model("Order", OrderSchema);
