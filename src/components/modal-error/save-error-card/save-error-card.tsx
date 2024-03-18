import { Button, Modal, notification } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { ResultStatusType } from 'antd/lib/result';
import './save-error-card.css';
import { CloseCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { getCssVar } from '@utils/get-css-var';
import { CalendarDataTeatId } from '@constants/data-test-id';


type ModalErrorProps = {
  handlePrimeButton: () => void,
};

const SaveErrorCard = ({ handlePrimeButton }: ModalErrorProps) => {


  return (

    <div className='modal-error-notification save-error-card'>
      <CloseCircleOutlined
        style={{ color: getCssVar('--character-light-error'), fontSize: 22 }}
      />
      <div className='modal-error__content' >
        <p
          className='save-error-card__title'
          data-test-id={CalendarDataTeatId.MODAL_ERROR_USER_TRAINING_TITLE}
        >
          При сохранении данных произошла ошибка
        </p>
        <p className='save-error-card__subtitle'
          data-test-id={CalendarDataTeatId.MODAL_ERROR_USER_TRAINING_SUBTITLE}
        >
          Придётся попробовать ещё раз
        </p>
        <Button
          className='modal-error__button modal-error__button_big'
          data-test-id={CalendarDataTeatId.MODAL_ERROR_USER_TRAINING_BUTTON}
          type='primary'
          size='large'
          onClick={handlePrimeButton}

        >
          Закрыть
        </Button>
      </div>
    </div>
  );
};

export default SaveErrorCard;
