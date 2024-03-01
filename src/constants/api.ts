export const baseUrl = 'https://marathon-api.clevertec.ru';

export enum HTTPMethod {
    DELETE = 'DELETE',
    GET = 'GET',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
}

export enum Endpoint {
    REGISTRATION = 'auth/registration ',
    LOGIN = 'auth/login',
    CHECK_EMAIL = 'auth/check-email ',
    CONFIRM_EMAIL = 'auth/confirm-email ',
    CHANGE_PASSWORD = 'auth/change-password ',
    FEEDBACK = 'feedback'
     
}
export enum Paths {
    MAIN = '/main',
    FEEDBACKS = '/feedbacks',
    LOGIN = '/auth',
    REGISTRATION = '/auth/registration',
    CONFIRM_EMAIL = '/auth/confirm-email',
    CHANGE_PASSWORD = '/auth/change-password',
    RESULT = '/result',
    ERROR_LOGIN = '/result/error-login',
    ERROR_USER_EXIST = '/result/error-user-exist',
    ERROR = '/result/error',
    ERROR_CHECK_EMAIL_NO_EXIST = '/result/error-check-email-no-exist',
    ERROR_CHECK_EMAIL = '/result/error-check-email',
    ERROR_CHANGE_PASSWORD = '/result/error-change-password',
    SUCCESS = '/result/success',
    SUCCESS_CHANGE_PASSWORD = '/result/success-change-password',
}

