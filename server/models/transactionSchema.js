import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  buyer: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const transaction = mongoose.model("transaction", transactionSchema);

export { transaction };
