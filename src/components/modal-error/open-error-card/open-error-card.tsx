import { Button } from 'antd';
import './open-error-card.css';
import { CloseCircleOutlined } from '@ant-design/icons';
import { CalendarDataTeatId } from '@constants/data-test-id';
import { getCssVar } from '@utils/get-css-var';

type ModalErrorProps = {
    handlePrimeButton: () => void;
};

const OpenErrorCard = ({ handlePrimeButton }: ModalErrorProps) => (
    <div className='modal-error-notification'>
        <CloseCircleOutlined style={{ color: getCssVar('--primary-light-6'), fontSize: 22 }} />
        <div className='modal-error__content'>
            <p
                className='open-error-card__title'
                data-test-id={CalendarDataTeatId.MODAL_ERROR_USER_TRAINING_TITLE}
            >
                При открытии данных произошла ошибка
            </p>
            <p
                className='modal-error__subtitle'
                data-test-id={CalendarDataTeatId.MODAL_ERROR_USER_TRAINING_SUBTITLE}
            >
                Попробовать ещё раз.
            </p>
            <Button
                className='modal-error__button modal-error__button_middle'
                data-test-id={CalendarDataTeatId.MODAL_ERROR_USER_TRAINING_BUTTON}
                type='primary'
                size='middle'
                onClick={handlePrimeButton}
            >
                Обновить
            </Button>
        </div>
    </div>
);

export default OpenErrorCard;
