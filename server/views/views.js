import express from "express";
import {
  addProduct,
  associateNFT,
  getProducts,
  updateStatusAndOwnerNFT,
} from "../controllers/productController.js";
import { login, register } from "../controllers/userController.js";
import {
  addTransaction,
  getTransactions,
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/addProduct", addProduct);
router.post("/associateNFT", associateNFT);
router.patch("/updateStatusAndOwnerNFT/:pid", updateStatusAndOwnerNFT);
router.post("/addTransaction", addTransaction);
router.get("/transactions", getTransactions);
router.post("/register", register);
router.post("/login", login);

export default router;
