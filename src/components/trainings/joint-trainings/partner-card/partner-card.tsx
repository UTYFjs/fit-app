import { Avatar, Button, Card } from 'antd';
import './partner-card.css';
import { UserOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { UserJointTrainingListType } from '@types/training-types';

type PartnerCardProps = {
    type: 'short' | 'full';
    user: UserJointTrainingListType;
    searchValue?: string;
};

export const PartnerCard = ({ type, user, searchValue }: PartnerCardProps) => {
    const { imageSrc, name, avgWeightInWeek, trainingType, status } = user;

    const [firstName, lastName] = name.split(' ');
    const isRejected = false;

    return (
        <Card
            className={classNames(
                'partner-card',
                isRejected && 'partner-card_rejected',
                type === 'full' && 'partner-card_full',
            )}
            bordered={false}
        >
            <div className='partner-card__wrapper'>
                <div className='partner-card__avatar'>
                    {imageSrc && <Avatar size={42} src={imageSrc} />}
                    {!imageSrc && <Avatar size={42} icon={<UserOutlined />} />}
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
                        <Button className='partner-card__btn' type='primary'>
                            Создать тренировку
                        </Button>
                        <div className='partner-card__status'>
                            {status && 'тренировка отклонена'}
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
};
