export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      guestbook: {
        Row: {
          id: string;
          guest_name: string;
          attendance: "Hadir" | "Tidak Hadir" | "Ragu";
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          guest_name: string;
          attendance: "Hadir" | "Tidak Hadir" | "Ragu";
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          guest_name?: string;
          attendance?: "Hadir" | "Tidak Hadir" | "Ragu";
          message?: string;
          created_at?: string;
        };
      };
    };
  };
}
