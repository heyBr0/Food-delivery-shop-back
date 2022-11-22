import express from "express";
import {
  getUsers,
  getSingleUser,
  createUser,
  patchUser,
  deleteUser,
  loginUser,
  checkUserToken,
} from "../Controllers/userControllers.js";
import { userValidation } from "../validations/validationMiddleware.js";
import { isAdmin } from "../validations/isAdminMiddleware.js";
import verifyToken from "../validations/verifyToken.js";
const router = express.Router();

// Route GET "/users"
router.get("/", verifyToken, isAdmin, getUsers);
// Route POST "/users/login"
router.post("/login", loginUser);
// verifyToken Route GET
router.get("/checkusertoken", checkUserToken);
// Route GET "/users/:id"
router.get("/:id", verifyToken, isAdmin, getSingleUser);
// Route POST "/users"
router.post("/", userValidation, createUser);
// Route PATCH "/users/:id"
router.patch("/:id", verifyToken, isAdmin, patchUser);
// Route DELETE "/users/:id"
router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;
