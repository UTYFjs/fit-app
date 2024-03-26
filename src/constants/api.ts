export const baseUrl = 'https://marathon-api.clevertec.ru';

export enum HTTPMethod {
    DELETE = 'DELETE',
    GET = 'GET',
    PATCH = 'PATCH',
    POST = 'POST',
    PUT = 'PUT',
}

export const enum Endpoint {
    REGISTRATION = 'auth/registration ',
    LOGIN = 'auth/login',
    CHECK_EMAIL = 'auth/check-email ',
    CONFIRM_EMAIL = 'auth/confirm-email ',
    CHANGE_PASSWORD = 'auth/change-password ',
    FEEDBACK = 'feedback',
    GOOGLE_AUTH = 'auth/google',
    TRAINING = 'training',
    TRAINING_LIST = 'catalogs/training-list',
    USER_ME = 'user/me',
    USER = 'user',
    TARIFF = 'tariff',
    TARIFF_CHECKOUT = 'tariff/checkout',
    UPLOAD_IMAGE = 'upload-image',
    TARIFF_LIST = 'catalogs/tariff-list',
}
export enum Paths {
    MAIN = '/main',
    FEEDBACKS = '/feedbacks',
    LOGIN = '/auth',
    REGISTRATION = '/auth/registration',
    CONFIRM_EMAIL = '/auth/confirm-email',
    CHANGE_PASSWORD = '/auth/change-password',
    CALENDAR = '/calendar',
    RESULT = '/result',
    ERROR_LOGIN = '/result/error-login',
    ERROR_USER_EXIST = '/result/error-user-exist',
    ERROR = '/result/error',
    ERROR_CHECK_EMAIL_NO_EXIST = '/result/error-check-email-no-exist',
    ERROR_CHECK_EMAIL = '/result/error-check-email',
    ERROR_CHANGE_PASSWORD = '/result/error-change-password',
    SETTINGS = '/settings',
    SUCCESS = '/result/success',
    SUCCESS_CHANGE_PASSWORD = '/result/success-change-password',
    TRAINING = '/training',
    PROFILE = '/profile',
    ACHIEVEMENT = '/achievement',
}

export const enum StatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    METHOD_NOT_ALLOWED = 405,
    SERVER_ERROR = 500,
    CONFLICT = 409,
}
