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

}