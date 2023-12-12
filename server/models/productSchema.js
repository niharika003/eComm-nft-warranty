import mongoose from "mongoose";

const warrantySchema = new mongoose.Schema({
  warranty: {
    type: Number,
    required: true,
  },
  warrantyDuration: {
    type: String,
    enum: ["Days", "Months", "Years"],
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  // Stores the name of the specific product
  name: {
    type: String,
    required: true,
  },
  // Stores the description of the product
  description: {
    type: String,
  },
  // Stores the price of the product
  price: {
    type: Number,
    required: true,
  },
  // Stores the price of the product in Eth
  priceEth: {
    type: Number,
    required: true,
  },
  // Stores details about the warranty associated with the product
  warranty: {
    type: warrantySchema,
    required: true,
  },
  // URL of the product image
  image: {
    type: String,
    required: true,
  },
  // Timestamp for when the product was last updated
  timestamp: {
    type: Date,
    default: Date.now,
  },
  // Details about the associated NFT
  nft: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NFT",
  },
  status: {
    type: String,
    enum: ["available", "sold"],
    default: "available",
  },
  seller: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);
const Warranty = mongoose.model("Warranty", warrantySchema);
export { Product, Warranty };
