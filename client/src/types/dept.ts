export interface WorkingHours {
  start: string;
  end: string;
}

export interface Department {
  name: string;
  managerId: string;
  workingHours: WorkingHours;
  workingDays: string[];
  shift: string;
}

export interface DepartmentResponse {
  id: string;
  name: string;
  managerId: {
    firstName:string
  };
  workingHours: WorkingHours;
  workingDays: string[];
  shift: "Morning" | "Evening" | "Night";
}
