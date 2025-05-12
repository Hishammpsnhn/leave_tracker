export interface EmpDetails {
  firstName: string;
  lastName: string;
  email: string;
  joiningDate: string;
  profile: File | null | string;
}
export interface EmpDetails {
  firstName: string;
  lastName: string;
  email: string;
  joiningDate: string;
  profile: string | null | File;
}

export interface EmployeeFormData extends EmpDetails {
  role: string;
  salary: string;
}

export interface Manager {
  id: string;
  name: string;
}

export interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  joiningDate?: string;
  role?: string;
  managerId?: string;
  salary?: string;
}

export interface LeaveRequest {
  _id:string
  leaveType:
    | "annual"
    | "sick"
    | "personal"
    | "maternity"
    | "bereavement"
    | "unpaid";
  startDate: Date;
  endDate: Date;
  reason: string;
  contactInfo: string;
  createdAt?: Date;
  status: "Pending" | "Approved" | "Rejected";
  empId?: string;
}
export interface LeaveRequestFormData {
  leaveType: string;
  startDate: Date | null;
  endDate: Date | null;
  reason: string;
  contactInfo: string;
}