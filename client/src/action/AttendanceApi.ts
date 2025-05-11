import type { AttendanceEntry } from "../types/attendance";
import apiClient from "./apiClient";

export const SignIn_API = async (signIn:Date|string) => {
  try {
    const { data } = await apiClient.post(`/emp/attendance`, {signIn});
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
export const GetSignInfo_API = async () => {
  try {
    const { data } = await apiClient.get(`/emp/attendance`);
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
export const UpdateAttendance_API = async (details:AttendanceEntry<string>) => {
  console.log(details)
  try {
    const { data } = await apiClient.patch(`/emp/attendance`,details);
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
export const GetAttendanceList_API = async () => {
  try {
    const { data } = await apiClient.get(`/emp/attendance_list`);
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
export const GetAttendanceForEdit_API = async () => {
  try {
    const { data } = await apiClient.get(`/manager/attendance`);
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
export const BulkUpdateAttendance_API = async (ids:string[],status:string) => {
  try {
    const { data } = await apiClient.put(`/manager/attendance`,{ids,status});
    return data;
  } catch (error: any) {
    console.error("Login failed:", error?.response?.data || error.message);
    throw error;
  }
};
