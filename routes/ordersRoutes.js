import express from "express";
import {
  getOrder,
  getOrders,
  createOrder,
  patchOrder,
  deleteOrder,
} from "../Controllers/orderControllers.js";

const router = express.Router();

router.get("/", getOrders);

// single order
router.get("/:id", getOrder);

router.post("/", createOrder);

router.patch("/:id", patchOrder);

router.delete("/:id", deleteOrder);

export default router;
