import { Request, Response } from "express";
import attendanceService from "../services/attendanceService";
import { AuthRequest } from "../middlewares/verifyToken";
import { convertUTCToLocalTimeOnly } from "../utils/UtlToLocal";
import { AttendanceStatus } from "../constants/AttendanceStatus";

class AttendanceController {
  public async signIn(req: AuthRequest, res: Response): Promise<void> {
    if (!req.user?.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const attendance = await attendanceService.createAttendance({
      employeeId: req.user.userId,
      date: req.body.signIn.split(" ")[0],
      loginTime: convertUTCToLocalTimeOnly(req.body.signIn),
    });
    if (!attendance) {
      res.status(400).json({ message: "Attendance Not Created" });
      return;
    }
    res.status(200).json({ success: true, attendance });
  }
  public async getAllAttendance(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const attendance = await attendanceService.getAllAttendance(
      req.user.userId
    );
    if (!attendance) {
      res.status(400).json({ message: "Attendance not Respond" });
      return;
    }
    res.status(200).json({ success: true, attendance });
  }
  public async getAttendanceForEditApproval(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const attendance = await attendanceService.getAttendanceForApproval();
    if (!attendance) {
      res.status(400).json({ message: "Attendance not Respond" });
      return;
    }
    res.status(200).json({ success: true, attendance });
  }
  public async getTodayAttendance(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const attendance = await attendanceService.getTodayAttendance(
      req.user?.userId
    );
    if (!attendance) {
      res.status(400).json({ message: "Attendance not Found" });
      return;
    }
    res.status(200).json({ success: true, attendance });
  }
  public async updateAttendance(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    console.log(req.body);
    if (!req.body._id) {
      res.status(400).json({ message: "Missing required data" });
      return;
    }
    const attendance = await attendanceService.updateAttendance({
      ...req.body,
      employeeId: req.user.userId,
    });
    if (!attendance) {
      res.status(400).json({ message: "Attendance not Found" });
      return;
    }
    res.status(200).json({ success: true, attendance });
  }
  public async BulkUpdateAttendance(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const { ids, status } = req.body;
    console.log(req.body)

    if (
      !Array.isArray(ids) ||
      ![AttendanceStatus.APPROVED, AttendanceStatus.REJECTED].includes(status)
    ) {
      res.status(400).json({ error: "Invalid input" });
      return;
    }
    const attendance = await attendanceService.BulkUpdateAttendance(ids,status,req.user.userId);
    if (!attendance) {
      res.status(400).json({ message: "Attendance not Found" });
      return;
    }
    res.status(200).json({ success: true, attendance });
  }
}

export default new AttendanceController();
