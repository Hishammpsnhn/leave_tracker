import type { LeaveRequest, LeaveRequestFormData } from "../types/employee";
import apiClient from "./apiClient";

export const CreateLeaveRequest_API = async (leaveDetails: LeaveRequest) => {
  try {
    const { data } = await apiClient.post(`/leave`, leaveDetails);
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
export const GetLeaveRequest_API = async () => {
  try {
    const { data } = await apiClient.get(`/leave`);
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
export const UpdateLeaveRequest_API = async (
  id: string,
  updatePayload: Partial<LeaveRequest>
) => {
  try {
    const { data } = await apiClient.put(`/leave/${id}`, updatePayload);
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
