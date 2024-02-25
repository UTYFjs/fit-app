export interface IRegistrationForm {
  email: string;
  password: string;
}
export interface IConfirmEmailForm {
  email: string;
  code: string;
}
export interface IChangePasswordForm{
  password: string;
  confirmPassword: string;
}
export interface ILoginRequest {
  accessToken: string;
}
export interface ICheckEmailRequest {
    email: string;
    message: string;
}
export interface IChangePasswordRequest{
   message: string;
}