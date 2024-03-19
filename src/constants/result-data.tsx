import { ResultStatusType } from 'antd/lib/result';

type resultDataType = {
    url: string;
    status: ResultStatusType;
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    dataTestId: string;
};
export const resultData: resultDataType[] = [
    {
        url: '/result/error-login',
        status: 'warning',
        title: 'Вход не выполнен',
        description: 'Что-то пошло не так. Попробуйте еще раз.',
        buttonText: 'Повторить',
        buttonLink: '/auth',
        dataTestId: 'login-retry-button',
    },
    {
        url: '/result/success',
        status: 'success',
        title: 'Регистрация успешна',
        description:
            'Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.',
        buttonText: 'Войти',
        buttonLink: '/auth',
        dataTestId: 'registration-enter-button',
    },
    {
        url: '/result/error-user-exist',
        status: 'error',
        title: 'Данные не сохранились',
        description:
            'Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.',
        buttonText: 'Назад к регистрации',
        buttonLink: '/auth/registration',
        dataTestId: 'registration-back-button',
    },
    {
        url: '/result/error',
        status: 'error',
        title: 'Данные не сохранились',
        description: 'Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.',
        buttonText: 'Повторить',
        buttonLink: '/auth/registration',
        dataTestId: 'registration-retry-button',
    },
    {
        url: '/result/error-check-email-no-exist',
        status: 'error',
        title: 'Такой e-mail не зарегистрирован',
        description: 'Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail',
        buttonText: 'Попробовать снова',
        buttonLink: '/auth',
        dataTestId: 'check-retry-button',
    },
    {
        url: '/result/error-check-email',
        status: '500',
        title: 'Что-то пошло не так',
        description: 'Произошла ошибка, попробуйте отправить форму ещё раз.',
        buttonText: 'Назад',
        buttonLink: '/auth',
        dataTestId: 'check-back-button',
    },
    {
        url: '/result/error-change-password',
        status: 'error',
        title: 'Данные не сохранились',
        description: 'Что-то пошло не так. Попробуйте ещё раз',
        buttonText: 'Повторить',
        buttonLink: '/auth/change-password',
        dataTestId: 'change-retry-button',
    },
    {
        url: '/result/success-change-password',
        status: 'success',
        title: 'Пароль успешно изменен',
        description: 'Теперь можно войти в аккаунт, используя свой логин и новый пароль',
        buttonText: 'Вход',
        buttonLink: '/auth',
        dataTestId: 'change-entry-button',
    },
];
