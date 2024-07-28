import express from "express";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployee,
  updateEmployee,
} from "../controller/EmployeeController.js"; // Added .js extension

const router = express.Router();

router.post("/create", createEmployee);
router.get("/getall", getAllEmployees);
router.get("/getone/:id", getEmployee);
router.put("/update/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployee);

export default router;
