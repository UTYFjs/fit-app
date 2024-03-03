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

export type IFeedback = {
  id: string;
  fullName: string | null;
  imageSrc: string | null;
  message: string | null;
  rating: number;
  createdAt: string;
}

export type IRatingStar = 0|1|2|3|4|5;

export type INewFeedback = {
    message: string;
    rating: IRatingStar;
};