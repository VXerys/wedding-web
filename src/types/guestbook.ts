export type AttendanceStatus = "Hadir" | "Tidak Hadir" | "Ragu";

export interface GuestbookEntry {
  id: string;
  guest_name: string;
  attendance: AttendanceStatus;
  message: string;
  created_at: string;
  isPending?: boolean;
}

export interface RSVPFormData {
  name: string;
  attendance: AttendanceStatus | "";
  message: string;
}

export interface FormErrors {
  name?: string;
  attendance?: string;
  message?: string;
}
