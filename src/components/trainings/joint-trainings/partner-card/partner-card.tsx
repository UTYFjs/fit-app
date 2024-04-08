import { Avatar, Card, Tooltip } from 'antd';
import './partner-card.css';
import { CheckCircleFilled, InfoCircleOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { UserJointTrainingListType } from '../../../../types/training-types';
import ButtonDrawerTraining from '@components/button-drawer-training/button-drawer-training';
import { PartnerStatus } from '@constants/training';
import { useAnswerInviteMutation } from '@services/invite-api';

type PartnerCardProps = {
    type: 'short' | 'full';
    user: UserJointTrainingListType;
    searchValue?: string;
};

export const PartnerCard = ({ type, user, searchValue }: PartnerCardProps) => {
    const { imageSrc, name, avgWeightInWeek, trainingType, status } = user;
    if (status) console.log('status', status, name);
    const [firstName, lastName] = name.split(' ');
    const [answerInvite] = useAnswerInviteMutation();
    const handleRejectTraining = () => {
        console.log('reject training', user);
        answerInvite({ id: user.inviteId || '', status: PartnerStatus.REJECTED });
    };
    return (
        <Card
            className={classNames(
                'partner-card',
                status === PartnerStatus.REJECTED && 'partner-card_rejected',
                type === 'full' && 'partner-card_full',
            )}
            bordered={false}
        >
            <div className='partner-card__wrapper'>
                <div className='partner-card__avatar'>
                    <Avatar
                        size={42}
                        src={imageSrc}
                        alt={name}
                        icon={!imageSrc && <UserOutlined />}
                    />
                    {/* {!imageSrc && <Avatar size={42} />} */}
                    <div>
                        <p className='partner-card__name'>{name ? firstName : 'Пользователь'}</p>
                        <p className='partner-card__name'>{lastName}</p>
                    </div>
                </div>
                <div className='partner-card__info'>
                    <p className='partner-card__info-title'>Тип тренировки:</p>
                    <p className='partner-card__info-value'>{trainingType}</p>
                    <p className='partner-card__info-title'>Средняя нагрузка:</p>
                    <p className='partner-card__info-value'>{avgWeightInWeek} кг/нед</p>
                </div>
                {type === 'full' && (
                    <>
                        <ButtonDrawerTraining
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
                                status === PartnerStatus.ACCEPTED ? handleRejectTraining : null
                            }
                            size='middle'
                            disabled={
                                status === PartnerStatus.REJECTED ||
                                status === PartnerStatus.PENDING
                            }
                        />
                        {/* <Button className='partner-card__btn' type='primary'>
                            Создать тренировку
                        </Button> */}
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
    );
};
