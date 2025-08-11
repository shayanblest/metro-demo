export interface ResetPasswordCommand {
  phoneNumber: string;
  otp: string;
  newPassword: string;
}
