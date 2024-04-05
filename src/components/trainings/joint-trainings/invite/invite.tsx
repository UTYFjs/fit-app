import { useState } from 'react';
import './invite.css';
import { Avatar, Button } from 'antd';
import { DownOutlined, UpOutlined, UserOutlined } from '@ant-design/icons';

export const Invite = () => {
    const [isAllInvites, setIsAllInvites] = useState(false);
    const imageSrc = '';
    const firstName = 'Елена';
    const lastName = 'Ковалева';
    const fullName = firstName + ' ' + lastName;
    const handleSeeAllInvites = () => {
        setIsAllInvites((state) => !state);
        console.log('isAllInvtes', isAllInvites);
    };
    const handleAcceptInvite = () => {};
    const handleRejectInvite = () => {};
    const handleSeeTrainingDetails = () => {};
    return (
        <div className='invite-wrapper'>
            <p className='invite__message-counts'> Новое сообщение </p>
            <div className='invite__card-item'>
                <div className='invite-card__avatar'>
                    {imageSrc && <Avatar size={42} src={imageSrc} />}
                    {!imageSrc && <Avatar size={42} icon={<UserOutlined />} />}
                    <div>
                        <p className='feedback-item__name-owner'>
                            {fullName ? firstName : 'Пользователь'}
                        </p>
                        <p className='feedback-item__name-owner'>{lastName}</p>
                    </div>
                </div>
                <div className='invite-card__message'>
                    <p className='invite-card__date'>17.01.2024</p>
                    <h5 className='invite-card__message-title'>
                        Привет, я ищу партнёра для совместных [силовых тренировок] . Ты хочешь
                        присоединиться ко мне на следующих тренировках?
                    </h5>
                    <p className='invite-card__details' onClick={handleSeeTrainingDetails}>
                        Посмотреть детали тренировки
                    </p>
                </div>
                <div className='invite-card__actions'>
                    <Button type='primary' size='large' onClick={handleAcceptInvite}>
                        Тренироваться вместе
                    </Button>
                    <Button size='large' onClick={handleRejectInvite}>
                        Отклонить запрос
                    </Button>
                </div>
            </div>
            <Button
                className='invite__btn-all-invites'
                type='text'
                size='small'
                icon={
                    isAllInvites ? (
                        <DownOutlined style={{ fontSize: 10, lineHeight: '24px' }} />
                    ) : (
                        <UpOutlined style={{ fontSize: 10, lineHeight: '24px' }} />
                    )
                }
                onClick={handleSeeAllInvites}
            >
                {isAllInvites ? 'Показать все сообщения' : 'Скрыть все сообщения'}
            </Button>
        </div>
    );
};
