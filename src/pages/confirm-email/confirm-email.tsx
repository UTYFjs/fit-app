import { useState } from 'react'
import VerificationInput from 'react-verification-input'
import './confirm-email.css'
import { Result } from 'antd'
import { useAppSelector } from '@hooks/typed-react-redux-hooks'
import { useConfirmEmailMutation } from '@services/auth-api'
import { useNavigate } from 'react-router-dom'
import { Paths } from '@constants/api'

const ConfirmEmail = () => {
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [value, setValue] = useState('');
    const { email } = useAppSelector((state) => state.user)
    const [confirmEmail] = useConfirmEmailMutation();
    const onComplete = () => {
        confirmEmail({ email: email, code: value })
            .unwrap()
            .then(() => {
                navigate(Paths.CHANGE_PASSWORD)
            })
            .catch(() => {
                setValue('')
                setIsError(true);
            })
    }
    return (
        <div>
            <Result
                status={isError ? 'error' : 'info'}
                title={
                    <span>
                        {isError ? 'Неверный код.' : ''} Введите код <br />
                        для восстановления аккаунта
                    </span>
                }
                subTitle={
                    <span>
                        Мы отправили вам на email <b>{email}</b> <br /> шестизначный код. Введите его в поле
                        ниже.
                    </span>
                }
                className='result-card'
            />
            <VerificationInput
                value={value}
                placeholder=''
                inputProps={{ 'data-test-id': 'verification-input' }}
                autoFocus
                length={6}
                classNames={{
                    container: 'container_verification-input',
                    character: isError ? 'character_error' : 'character_correct',
                    characterInactive: 'character_inactive',
                    characterSelected: 'character_selected',
                    characterFilled: 'character_filled',
                }}
                onChange={(value) => setValue(value)}
                onComplete={onComplete}
            />
            <p className='extra__text'>Не пришло письмо? Проверьте папку Спам.</p>
        </div>
    );
}

export default ConfirmEmail
