import { Avatar, Button, Card, Tooltip } from 'antd';
import './partner-card.css';
import { CheckCircleFilled, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { UserJointTrainingListType } from '../../../../types/training-types';
import { ButtonDrawerTraining } from '@components/button-drawer-training/button-drawer-training';
import { PartnerStatus } from '@constants/training';
import { useDeleteInviteMutation, useLazyGetInviteListQuery } from '@services/invite-api';
import { TrainingDataTestId } from '@constants/data-test-id';
import { ModalError } from '@components/modal-error/modal-error';
import { useState } from 'react';
import { PartnerAvatar } from './partner-avatar/partner-avatar';
import { PartnerInfo } from './partner-info/partner-info';
import { HighlightedText } from '@components/highlighted-text/highlighted-text';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { deletePartnerFromList } from '@redux/training-slice';

type PartnerCardProps = {
    type: 'short' | 'full';
    user: UserJointTrainingListType;
    index: number;
    searchValue?: string;
};

export const PartnerCard = ({ type, user, index, searchValue }: PartnerCardProps) => {
    const [getInviteList] = useLazyGetInviteListQuery();
    const [deleteInvite] = useDeleteInviteMutation();
    const dispatch = useAppDispatch();

    const { imageSrc, name, avgWeightInWeek, trainingType, status } = user;
    const [isOpenModal, setIsModalOpen] = useState(false);

    const handleRejectTraining = async () => {
        await deleteInvite(user.inviteId || '');
        dispatch(deletePartnerFromList(user.id));
        await getInviteList();
    };
    const handleClickModal = () => {
        if (type === 'short') setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <Card
                data-test-id={`${TrainingDataTestId.JOINT_TRAINING_CARDS_INDEX}${index}`}
                className={classNames(
                    'partner-card',
                    status === PartnerStatus.REJECTED && 'partner-card_rejected',
                    type === 'full' ? 'partner-card_full' : 'partner-card_short',
                )}
                bordered={false}
                onClick={handleClickModal}
            >
                <div className='partner-card__wrapper'>
                    <div className='partner-card__avatar'>
                        <Avatar
                            size={42}
                            src={imageSrc}
                            alt={name}
                            icon={!imageSrc && <UserOutlined />}
                        />
                        <div>
                            <HighlightedText
                                text={name ? name : 'Пользователь'}
                                searchValue={searchValue || ''}
                            />
                        </div>
                    </div>
                    <PartnerInfo avgWeightInWeek={avgWeightInWeek} trainingType={trainingType} />
                    {type === 'full' && (
                        <>
                            <ButtonDrawerTraining
                                dataTestIdBtn={TrainingDataTestId.CREATE_NEW_TRAINING_BUTTON}
                                partnerUser={user}
                                isJoint={true}
                                isPeriodicity={true}
                                isEdit={false}
                                className={
                                    status === PartnerStatus.ACCEPTED
                                        ? 'partner-card__btn_default'
                                        : 'partner-card__btn'
                                }
                                type={status === PartnerStatus.ACCEPTED ? 'default' : 'primary'}
                                btnText={
                                    status === PartnerStatus.ACCEPTED
                                        ? 'Отменить тренировку'
                                        : 'Создать тренировку'
                                }
                                onClickBtn={
                                    status === PartnerStatus.ACCEPTED && handleRejectTraining
                                }
                                size='middle'
                                disabled={
                                    status === PartnerStatus.REJECTED ||
                                    status === PartnerStatus.PENDING
                                }
                            />
                            <div className='partner-card__status'>
                                {status === PartnerStatus.REJECTED && (
                                    <>
                                        <Tooltip
                                            title='повторный запрос будет доступен через 2 недели'
                                            style={{ width: '100px' }}
                                        >
                                            <p>тренировка отклонена</p>
                                        </Tooltip>
                                        <InfoCircleOutlined
                                            style={{ color: 'var(--character-light-secondary-45)' }}
                                        />
                                    </>
                                )}
                                {status === PartnerStatus.ACCEPTED && (
                                    <>
                                        <p>тренировка одобрена</p>
                                        <CheckCircleFilled
                                            style={{ color: 'var(--character-light-success)' }}
                                        />
                                    </>
                                )}
                                {status === PartnerStatus.PENDING && <p>ожидает подтверждения</p>}
                            </div>
                        </>
                    )}
                </div>
            </Card>
            <ModalError isOpen={isOpenModal} onCancel={handleCloseModal} isClosable width={539}>
                <div
                    data-test-id={TrainingDataTestId.PARTNER_MODAL}
                    className='partner-modal__wrapper'
                >
                    <PartnerAvatar imageSrc={imageSrc} name={name} />
                    <PartnerInfo avgWeightInWeek={avgWeightInWeek} trainingType={trainingType} />
                    <div className='partner-card__status'>
                        <p>тренировка одобрена</p>
                        <CheckCircleFilled style={{ color: 'var(--character-light-success)' }} />
                    </div>
                    <Button
                        className='partner__btn-reject'
                        type='default'
                        size='large'
                        onClick={handleRejectTraining}
                    >
                        Отменить тренировку
                    </Button>
                </div>
            </ModalError>
        </>
    );
};
