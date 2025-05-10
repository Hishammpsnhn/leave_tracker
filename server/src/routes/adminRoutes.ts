import { Router } from "express";
import adminController from "../controller/adminController";

const router = Router();

router.route("/users").post(adminController.createEmp);
// router.route("/users").get(AuthController.login).post(AuthController.login);

// router
//   .route("/users/:id")
//   .post(AuthController.login)
//   .put(AuthController.login)
//   .delete(AuthController.login);

export default router;
