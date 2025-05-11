import { Router } from "express";
import attendanceController from "../controller/AttendanceController";
import { authorizeRoles, verifyToken } from "../middlewares/verifyToken";
import { UserRole } from "../constants/userRoles";

const router = Router();
router.use(verifyToken, authorizeRoles(UserRole.MANAGER));

router
  .route("/attendance")
  .get(attendanceController.getAttendanceForEditApproval)
  .put(attendanceController.BulkUpdateAttendance);

export default router;
