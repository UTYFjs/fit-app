import { Button, Card, Empty } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './invite-details-card.css';

import { ResTrainingType } from '../../../../types/training-types';
import { BadgeTraining } from '@components/badge-training/badge-training';
import { DateFormat } from '@constants/date';
import moment from 'moment';
import { getPeriodTextByValue } from '@utils/get-period-text-by-value';
import { useWindowWidth } from '@hooks/useWindowWidth';

type InviteDetailsCardProps = {
    record: ResTrainingType;
    onClose: () => void;
    dataTestId: string;
};

export const InviteDetailsCard = ({ record, onClose, dataTestId }: InviteDetailsCardProps) => {
    const { width } = useWindowWidth();

    return (
        <Card
            data-test-id={dataTestId}
            className='card-training card-invite-details'
            bordered={false}
            headStyle={{
                padding: 'var(--p-4xs) var(--p-m)',
            }}
            style={{
                top: width < 900 && width > 800 ? 'auto' : 0,
                left: 0,
                bottom: 0,
            }}
            title={
                <div className='card-exercise-info__title-wrapper'>
                    <BadgeTraining text={record.name} isShort />
                    <Button
                        type='text'
                        size='small'
                        style={{ height: 16, width: 16 }}
                        icon={<CloseOutlined />}
                        onClick={onClose}
                    />
                </div>
            }
        >
            {
                <div className='invite-details__content-wrapper'>
                    <div className='card-exercise__content-item'>
                        <span className='invite-details__periodicity'>
                            {getPeriodTextByValue(record.parameters.period)}
                        </span>
                        <span className='invite-details__date'>
                            {moment(record.date).format(DateFormat.DOT_DD_MM_YYYY)}
                        </span>
                    </div>
                    {record.exercises?.map((item, index) => (
                        <div key={index} className='card-exercise__content-item'>
                            <span className='invite-details__exercise-name'> {item.name}</span>
                            <span className='invite-details__exercise-values'>
                                {' '}
                                {item.approaches} x (
                                {item.weight ? item.weight + ' кг' : item.replays})
                            </span>
                        </div>
                    ))}

                    {record.exercises?.length === 0 && (
                        <Empty
                            className=''
                            image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
                            imageStyle={{ height: 32 }}
                            description=''
                        />
                    )}
                </div>
            }
        </Card>
    );
};
