import { Nullable } from './common-types';

export type IRegistrationForm = {
    email: string;
    password: string;
};
export type IConfirmEmailForm = {
    email: string;
    code: string;
};
export type IChangePasswordForm = {
    password: string;
    confirmPassword: string;
};
export type ILoginRequest = {
    accessToken: string;
};
export type ICheckEmailRequest = {
    email: string;
    message: string;
};
export type IChangePasswordRequest = {
    message: string;
};

export type IFeedback = {
    id: string;
    fullName: Nullable<string>;
    imageSrc: Nullable<string>;
    message: Nullable<string>;
    rating: number;
    createdAt: string;
};

export type IRatingStar = 0 | 1 | 2 | 3 | 4 | 5;

export type INewFeedback = {
    message: string;
    rating: IRatingStar;
};

export type IUserInfo = {
    email: string;
    firstName: string;
    lastName: string;
    birthday: string;
    imgSrc: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff: {
        tariffId: string;
        expired: string;
    };
};
export type IChangeUserInfo = Omit<IUserInfo, 'tariff'> & {
    password: string;
};

export type IChangeTariffRequest = {
    tariffId: string;
    days: number;
};

type ITariffPeriod = {
    text: string;
    cost: number;
    days: number;
};

export type ITariff = {
    _id: string;
    name: string;
    periods: ITariffPeriod[];
};
