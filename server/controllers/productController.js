import { NFT } from "../models/nftSchema.js";
import { Product, Warranty } from "../models/productSchema.js";

export const getProducts = async (request, response) => {
  try {
    const products = await Product.find({}).populate("nft");
    response.json(products);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};

export const addProduct = async (request, response) => {
  try {
    const {
      name,
      description,
      price,
      warranty,
      warrantyDuration,
      image,
      priceEth,
      seller,
    } = request.body;

    const newWarranty = new Warranty({
      warranty,
      warrantyDuration,
    });
    const newProduct = new Product({
      name,
      description,
      price,
      warranty: newWarranty,
      image,
      timestamp: new Date(),
      priceEth,
      seller,
    });
    const result = await newProduct.save();
    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error.message });
  }
};

export const associateNFT = async (request, response) => {
  try {
    const { sno, name, image, productID, tokenID, transactionHash, ownerNFT } =
      request.body;
    const newNFT = new NFT({
      sno,
      name,
      image,
      tokenID,
      transactionHash,
      productID,
      ownerNFT,
    });
    const savedNFT = await newNFT.save();

    // Find the product corresponding to the productID and update its nft property
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productID },
      { $set: { nft: savedNFT._id } },
      { new: true }
    );

    response.status(200).json({ savedNFT, updatedProduct });
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error.message });
  }
};

export const updateStatusAndOwnerNFT = async (req, res) => {
  try {
    const { pid } = req.params;
    const { ownerNFT } = req.body;

    // Find the product with the given pid and get its nftId
    const product = await Product.findById(pid).populate("nft");
    const nftId = product.nft._id;
    const updated = await updateProductAndNFT(pid, "sold", ownerNFT, nftId);

    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateProductAndNFT = async (
  productId,
  status,
  ownerNFT,
  nftId
) => {
  try {
    // Update the product status and buyer
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { $set: { status: status } },
      { new: true }
    );

    // Update the NFT ownerNFT
    const updatedNFT = await NFT.findOneAndUpdate(
      { _id: nftId },
      { $set: { ownerNFT: ownerNFT } },
      { new: true }
    );

    return { updatedProduct, updatedNFT };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update product and NFT");
  }
};
