import { Button, Card, Empty } from 'antd';
import type { Moment } from 'moment';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import './card-training.css';
import BadgeTraning from '@components/badge-training/badge-training';
import { CalendarDataTeatId } from '@constants/data-test-id';
import { isPast } from '@utils/date-utils';
import { getCssVar } from '@utils/get-css-var';

import { ResTrainingType } from '../../../types/training-types';

type CardTrainingProps = {
    currentTrainings: ResTrainingType[];
    isDisableCreateBtn: boolean;
    calendarDate: Moment;
    topPosition: number;
    setSelectedTraining: (selectedTraining: string) => void;
    onClose: () => void;
    onCreate: () => void;
    onEdit: () => void;
};

const CardTraining = ({
    currentTrainings = [],
    isDisableCreateBtn,
    calendarDate,
    topPosition,
    setSelectedTraining,
    onClose,
    onCreate,
    onEdit,
}: CardTrainingProps) => {
    const date = calendarDate.format('DD.MM.YYYY');

    return (
        <Card
            className='card-training'
            bordered={false}
            style={{
                top: topPosition,
                right: calendarDate.days() === 6 ? 0 : 'initial',
                left: topPosition > 0 ? 24 : 'initial',
            }}
            bodyStyle={{ padding: 0 }}
            data-test-id={CalendarDataTeatId.MODAL_CREATE_TRAINING}
            actions={[
                <Button
                    key={'create-training'}
                    style={{ width: '100%' }}
                    disabled={isDisableCreateBtn || isPast(calendarDate)}
                    type='primary'
                    size='large'
                    onClick={onCreate}
                >
                    {' '}
                    Создать тренировку
                </Button>,
            ]}
        >
            <Meta
                title={
                    <div className='card-traning__title-wrapper'>
                        <div>
                            <p className='card-training__title'>{`Тренировки на ${
                                date || 'fake date'
                            } `}</p>
                            {currentTrainings.length === 0 && (
                                <p className='card-training_subtitle'>Нет активных тренировок</p>
                            )}
                        </div>
                        <Button
                            data-test-id={CalendarDataTeatId.MODAL_CREATE_TRAINING_BUTTON_CLOSE}
                            className='card-training__title-button'
                            type='text'
                            size='small'
                            icon={<CloseOutlined />}
                            onClick={onClose}
                        />{' '}
                    </div>
                }
            />
            {
                <div className='card-training__content'>
                    {currentTrainings &&
                        currentTrainings.map((item, index) => (
                            <div className='card-training__item' key={index}>
                                <BadgeTraning
                                    key={item._id + 'training'}
                                    isDisable={item.isImplementation}
                                    text={item.name}
                                />
                                <Button
                                    className='badge__button'
                                    data-test-id={`${CalendarDataTeatId.MODAL_UPDATE_TRAINING_EDIT_BUTTON_INDEX}${index}`}
                                    type='text'
                                    size='small'
                                    disabled={item.isImplementation}
                                    onClick={() => {
                                        setSelectedTraining(item.name);
                                        onEdit();
                                    }}
                                    icon={
                                        <EditOutlined
                                            disabled={item.isImplementation}
                                            style={{
                                                color: item.isImplementation
                                                    ? getCssVar('--character-light-disable-25')
                                                    : getCssVar('--primary-light-6'),
                                            }}
                                        />
                                    }
                                />
                            </div>
                        ))}
                    {currentTrainings.length === 0 && (
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
export default CardTraining;
