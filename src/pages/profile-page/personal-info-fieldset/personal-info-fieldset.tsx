import { DatePicker, Form, Input, Typography } from 'antd';
import './personal-info-fieldset.css';

import { ProfileDataTestId } from '@constants/data-test-id';
import UploadImage from '@components/upload-image/upload-image';

import { localeCalendar2 } from '@constants/calendar';
import { DateFormat } from '@constants/date';

type PersonalInfoFieldsetProps = {
    imgSrc: string;
    handleUploadImageError: () => void;
};
export const PersonalInfoFieldset = ({
    imgSrc,
    handleUploadImageError,
}: PersonalInfoFieldsetProps) => {
    return (
        <fieldset className='profile__personal-info'>
            <Typography.Title className='profile__title' level={5}>
                Личная информация
            </Typography.Title>
            <div className='profile__personal-wrapper'>
                <Form.Item valuePropName='fileList' data-test-id={ProfileDataTestId.PROFILE_AVATAR}>
                    <UploadImage imgSrc={imgSrc} handlerError={handleUploadImageError} />
                </Form.Item>
                <div className='profile-page__item-wrapper'>
                    <Form.Item name='firstName'>
                        <Input
                            type='text'
                            placeholder='Имя'
                            size='large'
                            data-test-id={ProfileDataTestId.INPUT_PROFILE_NAME}
                        />
                    </Form.Item>
                    <Form.Item name='lastName'>
                        <Input
                            type='text'
                            placeholder='Фамилия'
                            size='large'
                            data-test-id={ProfileDataTestId.INPUT_PROFILE_SURNAME}
                        />
                    </Form.Item>
                    <Form.Item name='birthday'>
                        <DatePicker
                            className='profile__date-picker'
                            locale={localeCalendar2}
                            format={DateFormat.DOT_DD_MM_YYYY}
                            placeholder='Дата рождения'
                            size='large'
                            data-test-id={ProfileDataTestId.PROFILE_BIRTHDAY}
                        />
                    </Form.Item>
                </div>
            </div>
        </fieldset>
    );
};
