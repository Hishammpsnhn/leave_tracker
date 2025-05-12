import { Router } from "express";
import adminController from "../controller/adminController";

const router = Router();

router
  .route("/users")
  .get(adminController.getEmployees)
  .post(adminController.createEmp);
router
  .route("/dashboard")
  .get(adminController.getDashboardStats)
router
  .route("/dept")
  .get(adminController.getDepartment)
  .post(adminController.createDepartment);


export default router;
