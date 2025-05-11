import { Router } from "express";
import attendanceController from "../controller/AttendanceController";
import { authorizeRoles, verifyToken } from "../middlewares/verifyToken";
import { UserRole } from "../constants/userRoles";

const router = Router();
router.use(verifyToken);

router
  .route("/attendance")
  .get(
    authorizeRoles(UserRole.EMPLOYEE),
    attendanceController.getTodayAttendance
  )
  .post(authorizeRoles(UserRole.EMPLOYEE), attendanceController.signIn)
  .patch(
    authorizeRoles(UserRole.EMPLOYEE),
    attendanceController.updateAttendance
  );
router
  .route("/attendance_list")
  .get(
    authorizeRoles(UserRole.EMPLOYEE),
    attendanceController.getAllAttendance
  )
  

export default router;
