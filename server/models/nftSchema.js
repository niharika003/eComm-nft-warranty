import mongoose from "mongoose";

const nftSchema = new mongoose.Schema({
  sno: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tokenID: {
    type: String,
    required: true,
  },
  transactionHash: {
    type: String,
    required: true,
  },
  productID: {
    type: String,
    required: true,
  },
  ownerNFT: {
    type: String,
    required: true,
  },
});

const NFT = mongoose.model("NFT", nftSchema);

export { NFT };
