import { IUserInfo } from './api';
import { Moment } from 'moment';

export interface IRegisterData {
    email: string;
    password: string;
    passwordRepeat: string;
}
export interface ILoginData {
    email: string;
    password: string;
    remember: boolean;
}

export type IUserProfileFormValues = Omit<IUserInfo, 'birthday'> & {
    birthday: Moment;
};
