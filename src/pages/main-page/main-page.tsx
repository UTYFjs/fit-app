import { useId } from 'react';

import { Button, Card, Col, Row } from 'antd';
import { HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { CustomCardAction } from '@components/custom-card-action/custom-card-action';
import { CalendarIcon } from '@components/custom-icons/custom-icons';

import 'antd/dist/antd.css';
import './main-page.css';
import ModalServerError from '@components/modal-server-error/modal-server-error';
import { Paths } from '@constants/api';
import { CalendarDataTeatId, ProfileDataTestId } from '@constants/data-test-id';
import { useLazyGetTrainingsQuery } from '@services/training-api';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
    const navigate = useNavigate();
    const [getTrainings, { isError }] = useLazyGetTrainingsQuery();
    const buttonActions = [
        {
            key: useId(),
            title: 'Расписать тренировки',
            icon: <HeartFilled />,
            label: 'Тренировки',
            pathTo: Paths.TRAINING,
        },
        {
            key: useId(),
            title: 'Назначить календарь',
            icon: <CalendarIcon />,
            label: 'Календарь',
            pathTo: Paths.CALENDAR,
            dataTestId: CalendarDataTeatId.MENU_BUTTON_CALENDAR,
        },
        {
            key: useId(),
            title: 'Заполнить профиль',
            icon: <IdcardOutlined />,
            label: 'Профиль',
            pathTo: Paths.PROFILE,
            dataTestId: ProfileDataTestId.MENU_BUTTON_PRIFILE,
        },
    ];

    const handleToTraining = async (pathTo: Paths) => {};
    const handleToCalendar = async (pathTo: Paths) => {
        try {
            if (pathTo === Paths.CALENDAR || pathTo === Paths.TRAINING) {
                await getTrainings().unwrap();
            }

            navigate(pathTo);
        } catch {
            () => {};
        }
    };
    return (
        <>
            <Card className='main-card' bordered={false}>
                <p>С CleverFit ты сможешь:</p>
                <p> — планировать свои тренировки на календаре, выбирая тип и уровень нагрузки;</p>
                <p>
                    — отслеживать свои достижения в разделе статистики, сравнивая свои результаты
                    с&nbsp;нормами и рекордами;{' '}
                </p>
                <p>
                    — создавать свой профиль, где ты можешь загружать свои фото, видео и отзывы
                    о&nbsp;тренировках;{' '}
                </p>
                <p>
                    — выполнять расписанные тренировки для разных частей тела, следуя подробным
                    инструкциям и советам профессиональных тренеров.
                </p>
            </Card>
            <Card className='main-card' bordered={false}>
                <p>
                    CleverFit — это не просто приложение, а твой личный помощник в&nbsp;мире
                    фитнеса. Не откладывай на завтра — начни тренироваться уже&nbsp;сегодня!
                </p>
            </Card>
            <Row gutter={[16, 8]} className='grid-container' style={{ marginTop: -8 }}>
                {buttonActions.map((item) => {
                    return (
                        <Col key={item.key} xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                            <CustomCardAction
                                title={item.title}
                                actions={[
                                    <Button
                                        key={item.key + 'button'}
                                        type='text'
                                        data-test-id={item?.dataTestId}
                                        icon={item.icon}
                                        onClick={() => {
                                            handleToCalendar(item.pathTo);
                                        }}
                                    >
                                        {item.label}{' '}
                                    </Button>,
                                ]}
                            />
                        </Col>
                    );
                })}
            </Row>
            {isError && (
                <ModalServerError
                    dataTestId={CalendarDataTeatId.MODAL_NO_REVIEW}
                    isOpen={isError}
                />
            )}
        </>
    );
};
