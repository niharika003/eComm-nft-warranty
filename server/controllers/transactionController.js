import { transaction } from "../models/transactionSchema.js";

export const addTransaction = async (request, response) => {
  try {
    const { productId, buyer, seller } = request.body;

    const newTransaction = new transaction({
      product: productId,
      buyer,
      seller,
      timestamp: new Date(),
    });
    const result = await newTransaction.save();
    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json({ error: error.message });
  }
};

export const getTransactions = async (request, response) => {
  try {
    const transactions = await transaction.find({}).populate("product");
    response.json(transactions);
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
