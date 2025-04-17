export interface UserData {
  _id: string;
  user_name: string;
  user_phone_number: string;
  user_gender: "Nam" | "Nữ" | "Khác" | undefined | "";
  user_birth_day: string;
  user_avt?: string;
  createdAt: string;
}
