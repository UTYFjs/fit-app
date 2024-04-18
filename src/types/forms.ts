import { IUserInfo } from './api';
import { Moment } from 'moment';

export type IRegisterData = {
    email: string;
    password: string;
    passwordRepeat: string;
};
export type ILoginData = {
    email: string;
    password: string;
    remember: boolean;
};

export type IUserProfileFormValues = Omit<IUserInfo, 'birthday'> & {
    birthday: Moment;
};
