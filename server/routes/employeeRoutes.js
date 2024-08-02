import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} from "../controller/EmployeeController.js";
import { auth, authorizeRoles } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", auth, authorizeRoles("admin"), createEmployee);
router.get("/getall", auth, authorizeRoles("admin"), getAllEmployees);
router.get("/getone/:id", auth, authorizeRoles("admin"), getEmployee);
router.put("/update/:id", auth, authorizeRoles("admin"), updateEmployee);
router.delete("/delete/:id", auth, authorizeRoles("admin"), deleteEmployee);

export default router;
