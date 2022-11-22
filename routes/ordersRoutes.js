import express from "express";
import {
  getOrders,
  getSingleOrder,
  createOrder,
  patchOrder,
  deleteOrder,
} from "../Controllers/orderControllers.js";
import { isAdmin } from "../validations/isAdminMiddleware.js";
import verifyToken from "../validations/verifyToken.js";
const router = express.Router();

// Route GET "/orders"
router.get("/", verifyToken, isAdmin, getOrders);
// Route GET "/orders/:id"
router.get("/:id", verifyToken, getSingleOrder);
// Route POST "/orders"
router.post("/", verifyToken, createOrder);
// Route PATCH "/orders/:id"
router.patch("/:id", verifyToken, patchOrder);
// Route DELETE "/orders/:id"
router.delete("/:id", verifyToken, deleteOrder);

export default router;
