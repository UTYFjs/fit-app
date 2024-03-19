import { regExpPassword } from '@constants/validation';
import { RuleObject } from 'antd/lib/form';

export const validationPassword = (_: RuleObject, value: string) => {
    if (regExpPassword.test(value)) {
        return Promise.resolve();
    } else {
        return Promise.reject('message reject promise');
    }
};
