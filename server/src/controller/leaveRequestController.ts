import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/verifyToken";
import leaveService from "../services/LeaveRequest";

class LeaveRequestController {
  public async createRequest(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const leaveRequest = await leaveService.createRequest({
        ...req.body,
        empId: req.user.userId,
      });

      res.status(200).json({ success: true, leaveRequest });
    } catch (error) {
      console.error("Error creating leave request:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async getRequestForApproval(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user?.userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      const leaveRequest = await leaveService.getRequestForApproval(
        req.user.userId
      );

      res.status(200).json({ success: true, leaveRequest });
    } catch (error) {
      console.error("Error creating leave request:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  public async updateRequest(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.userId) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
      const { id } = req.params;

      const leaveRequest = await leaveService.update(id, req.body);

      res.status(200).json({ success: true, leaveRequest });
    } catch (error) {
      console.error("Error creating leave request:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new LeaveRequestController();
