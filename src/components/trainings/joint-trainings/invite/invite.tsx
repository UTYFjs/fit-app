import { useState } from 'react';
import './invite.css';
import { Avatar, Button } from 'antd';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';
import { InviteType } from '../../../../types/training-types';
import moment from 'moment';
import { DateFormat } from '@constants/date';
import { PartnerStatus, TrainingsInviteMessage } from '@constants/training';
import { InviteDetailsCard } from '../invite-details-card/invite-details-card';
import { useAnswerInviteMutation } from '@services/invite-api';

type InviteProps = {
    inviteList: InviteType[];
};
export const Invite = ({ inviteList }: InviteProps) => {
    const [isAllInvites, setIsAllInvites] = useState(false);
    const [isOpenModalDetails, setIsOpenModalDetails] = useState(false);
    const [currentInviteIdInvite, setIsCurrentIdInvite] = useState('');
    const [answerInvite, { isError: IsErrorAnswerInvite }] = useAnswerInviteMutation();

    const handleSeeAllInvites = () => {
        setIsAllInvites((state) => !state);
        console.log('isAllInvtes', isAllInvites);
    };
    const handleAcceptInvite = (idInvite: string) => {
        console.log('accept invite', idInvite);
        answerInvite({ id: idInvite, status: PartnerStatus.ACCEPTED });
    };
    const handleRejectInvite = (idInvite: string) => {
        answerInvite({ id: idInvite, status: PartnerStatus.REJECTED });
        console.log('reject invite', idInvite);
    };
    const handleSeeTrainingDetails = (id: string) => {
        setIsCurrentIdInvite(id);
        setIsOpenModalDetails(true);
        console.log('open modal');
    };
    const handleCloseModalDetails = () => {
        setIsCurrentIdInvite('');
        setIsOpenModalDetails(false);
        console.log('close modal');
    };
    return (
        <div className='invite-wrapper'>
            <p className='invite__message-counts'> Новое сообщение ({inviteList.length}) </p>
            {(isAllInvites ? inviteList : inviteList.slice(0, 1)).map(
                ({ _id, createdAt, from, training }) => (
                    <div className='invite__card-item' key={_id}>
                        <div className='invite-card__avatar'>
                            {from.imageSrc && <Avatar size={42} src={from.imageSrc} />}
                            {!from.imageSrc && <Avatar size={42} icon={<UserOutlined />} />}
                            <div>
                                <p className='feedback-item__name-owner'>
                                    {from.firstName || 'Пользователь'}
                                </p>
                                <p className='feedback-item__name-owner'>{from.lastName}</p>
                            </div>
                        </div>
                        <div className='invite-card__message'>
                            <p className='invite-card__date'>
                                {moment(createdAt).format(DateFormat.DOT_DD_MM_YYYY)}
                            </p>
                            <h5 className='invite-card__message-title'>
                                Привет, я ищу партнёра для совместных{' '}
                                {
                                    TrainingsInviteMessage[
                                        training.name as keyof typeof TrainingsInviteMessage
                                    ]
                                }
                                . Ты хочешь присоединиться ко мне на следующих тренировках?
                            </h5>
                            <div className='invite-card__details-wrapper'>
                                <Button
                                    type='link'
                                    className='invite-card__details'
                                    onClick={() => handleSeeTrainingDetails(_id)}
                                >
                                    Посмотреть детали тренировки
                                </Button>
                                {isOpenModalDetails && currentInviteIdInvite === _id && (
                                    <InviteDetailsCard
                                        record={training}
                                        onClose={handleCloseModalDetails}
                                    />
                                )}
                            </div>
                        </div>
                        <div className='invite-card__actions'>
                            <Button
                                type='primary'
                                size='large'
                                onClick={() => handleAcceptInvite(_id)}
                            >
                                Тренироваться вместе
                            </Button>
                            <Button size='large' onClick={() => handleRejectInvite(_id)}>
                                Отклонить запрос
                            </Button>
                        </div>
                    </div>
                ),
            )}

            <Button
                className='invite__btn-all-invites'
                type='link'
                size='small'
                icon={
                    isAllInvites ? (
                        <UpOutlined style={{ fontSize: 10, lineHeight: '24px' }} />
                    ) : (
                        <DownOutlined style={{ fontSize: 10, lineHeight: '24px' }} />
                    )
                }
                onClick={handleSeeAllInvites}
            >
                {isAllInvites ? 'Скрыть все сообщения' : 'Показать все сообщения'}
            </Button>
        </div>
    );
};
