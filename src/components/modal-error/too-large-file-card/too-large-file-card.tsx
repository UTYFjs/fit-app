import { Button } from 'antd';
import '../save-error-card/save-error-card.css';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ProfileDataTestId } from '@constants/data-test-id';

type ModalErrorProps = {
    handlePrimeButton: () => void;
};

const TooLargeFileCard = ({ handlePrimeButton }: ModalErrorProps) => (
    <div className='modal-error-notification save-error-card'>
        <CloseCircleOutlined style={{ color: 'var(--character-light-error)', fontSize: 22 }} />
        <div className='modal-error__content'>
            <p className='save-error-card__title'>Файл слишком большой</p>
            <p className='save-error-card__subtitle'>Выберите файл размером до 5 МБ.</p>
            <Button
                className='modal-error__button modal-error__button_big'
                data-test-id={ProfileDataTestId.BIG_FILE_ERROR_CLOSE}
                type='primary'
                size='large'
                onClick={handlePrimeButton}
            >
                Закрыть
            </Button>
        </div>
    </div>
);

export default TooLargeFileCard;
