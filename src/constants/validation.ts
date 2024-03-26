import { Rule } from 'antd/lib/form';

export interface IMessageValidation {
    password: string;
    repeatPassword: string;
}

export const messageValidation: IMessageValidation = {
    password: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
    repeatPassword: 'Пароли не совпадают',
};

export const regExpEmail = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
export const regExpPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

export const validationRulesEmail: Rule[] = [
    { required: true, message: '' },
    { type: 'email', message: '' },
];
