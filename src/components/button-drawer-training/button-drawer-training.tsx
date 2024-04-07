import { Button } from 'antd';

import { ReactNode, useEffect, useState } from 'react';

import { IRatingStar } from '../../types/api';
import ModalFeedback from '@components/modal-feedback/modal-feedback';
import { useAddFeedbackMutation } from '@services/feedback-api';
import ModalResult from '@components/modal-result/modal-result';
import DrawerCustom from '@components/drawer-custom/drawer-custom';
import './button-drawer-training.css';
import { ButtonProps } from 'antd/lib/button/button';

type ButtonDrawerTrainingProps = ButtonProps & {
    buttonClass?: string;
    btnText?: string;
    dataTestIdBtn?: string;
    refetch?: () => void;
    drawerChildren?: ReactNode;
};
const ButtonDrawerTraining = ({
    buttonClass,
    btnText,
    dataTestIdBtn,
    refetch,
    drawerChildren,
    ...rest
}: ButtonDrawerTrainingProps) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalResultOpen, setIsModalResultOpen] = useState(false);
    const [modalResultType, setModalResultType] = useState<'errorReview' | 'successReview' | null>(
        null,
    );
    const [textFeedbackValue, setTextFeedBackValue] = useState('');
    const [ratingValue, setRatingValue] = useState<IRatingStar>(3);
    const [addFeedback, { isError: isErrorAddFeedback, isSuccess: isSuccessAddFeedback }] =
        useAddFeedbackMutation();

    // useEffect(() => {
    //     if (isErrorAddFeedback) {
    //         setIsModalFeedbackOpen(false);
    //         setModalResultType('errorReview');
    //         setIsModalResultOpen(true);
    //     }
    // }, [isErrorAddFeedback]);

    // useEffect(() => {
    //     if (isSuccessAddFeedback) {
    //         setIsModalFeedbackOpen(false);
    //         setModalResultType('successReview');
    //         setIsModalResultOpen(true);
    //         refetch && refetch();
    //     }
    // }, [isSuccessAddFeedback, refetch]);

    const handleOpenDrawer = () => setIsDrawerOpen(true);
    const handleCloseDrawer = () => setIsDrawerOpen(false);

    const handleDrawerAction = () => {
        console.log('drawer Action');
    };

    // const handleSendFeedBack = () =>
    //     addFeedback({ message: textFeedbackValue, rating: ratingValue });

    // const handleSuccessFeedback = () => {
    //     setIsModalResultOpen(false);
    //     setModalResultType(null);
    // };
    // const handleRetryErrorSendFeedback = () => {
    //     setIsModalResultOpen(false);
    //     setModalResultType(null);
    //     setIsModalFeedbackOpen(true);
    // };

    // const handleCancelErrorFedback = () => {
    //     setIsModalFeedbackOpen(false);
    //     setIsModalResultOpen(false);
    //     setModalResultType(null);
    // };

    return (
        <>
            <Button
                className={buttonClass}
                type='primary'
                size='large'
                onClick={handleOpenDrawer}
                data-test-id={dataTestIdBtn}
                {...rest}
            >
                {btnText}
            </Button>
            <DrawerCustom
                drawerTitle={'Новая тренировка'}
                isDrawerOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                footer={
                    <Button
                        type='primary'
                        size='large'
                        style={{ width: '100%' }}
                        onClick={handleDrawerAction}
                    >
                        Сохранить
                    </Button>
                }
            >
                Custom Drawer
                {drawerChildren}
            </DrawerCustom>
            {/* <ModalResult
                isOpen={isModalResultOpen}
                typeContent={modalResultType}
                handlePrimeButton={
                    modalResultType === 'errorReview'
                        ? handleRetryErrorSendFeedback
                        : handleSuccessFeedback
                }
                handleSecondButton={handleCancelErrorFedback}
            /> */}
        </>
    );
};

export default ButtonDrawerTraining;
