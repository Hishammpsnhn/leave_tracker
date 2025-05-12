import { Router } from "express";
import LeaveController from "../controller/leaveRequestController";
import { authorizeRoles, verifyToken } from "../middlewares/verifyToken";
import { UserRole } from "../constants/userRoles";

const router = Router();
router.use(verifyToken);

router
  .get(
    "/",
    authorizeRoles(UserRole.MANAGER),
    LeaveController.getRequestForApproval
  )
  .post("/", authorizeRoles(UserRole.EMPLOYEE), LeaveController.createRequest)
  .put('/:id',authorizeRoles(UserRole.MANAGER),LeaveController.updateRequest)

export default router;
