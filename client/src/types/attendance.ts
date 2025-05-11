
export interface AttendanceEntry<T> {
  employeeId?: string;
  date?: string;
  loginTime?: T;  
  logoutTime?: T;
  isLate?: T;
  reason?: T;
  isEdited?: boolean;
  editRequestedBy?: T;
  editApprovedBy?: T;
  status?: T;
  _id?: T;
}
export type AttendanceData = {
  _id: string;
  date: string;
  employeeId: string;
  reason: string | null;
  createdAt: string;
  editApprovedBy: string | null;
  editRequestedBy: string | null;
  isEdited: boolean;
  isLate: boolean;
  loginTime: string;
  logoutTime: string;
  status: string;
  updatedAt: string;
};