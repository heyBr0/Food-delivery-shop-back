import express from "express";
import {
  getRecords,
  getSingleRecord,
  createRecord,
  deleteRecord,
  patchRecord,
} from "../Controllers/recordsController.js";
import { isAdmin } from "../validations/isAdminMiddleware.js";
import verifyToken from "../validations/verifyToken.js";
const router = express.Router();

// Route GET "/records"
router.get("/", getRecords);
// Route GET "/records/:id"
router.get("/:id", getSingleRecord);
// Route POST "/records"
router.post("/", verifyToken, isAdmin, createRecord);
// Route PATCH "/records/:id"
router.patch("/:id",verifyToken, isAdmin, patchRecord);
// Route DELETE "/records/:id"
router.delete("/:id", verifyToken, isAdmin, deleteRecord);

export default router;
