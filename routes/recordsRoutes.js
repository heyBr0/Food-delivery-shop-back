import express from "express";
import {
  getRecord,
  getRecords,
  createRecord,
  deleteRecord,
  patchRecord,
} from "../Controllers/recordsController.js";
import { isAdmin } from "../validations/isAdminMiddleware.js";

const router = express.Router();

router.get("/", getRecords);

// single record
router.get("/:id", getRecord);

router.post("/", isAdmin, createRecord);

router.patch("/:id",isAdmin, patchRecord);

router.delete("/:id",isAdmin, deleteRecord);

export default router;
