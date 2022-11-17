import express from "express";
import {
  getUsers,
  getUser,
  createUser,
  patchUser,
  deleteUser,
} from "../Controllers/userControllers.js";
import { userValidation } from "../validations/validationMiddleware.js";
import { loginUser } from "../Controllers/userControllers.js";
import { isAdmin } from "../validations/isAdminMiddleware.js";


const router = express.Router();

router.get("/", isAdmin, getUsers);

// single user
router.get("/:id", isAdmin, getUser);

// route POST
router.post("/login", loginUser);

router.post("/", userValidation, createUser);

router.patch("/:id",isAdmin, patchUser);

router.delete("/:id",isAdmin, deleteUser);

export default router;
