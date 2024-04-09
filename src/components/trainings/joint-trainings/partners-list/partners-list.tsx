import { List } from 'antd';
import { PartnerCard } from '../partner-card/partner-card';
import './partners-list.css';
import { useGetTrainingPalsQuery } from '@services/training-api';

export const PartnersList = () => {
    const { data: dataTrainingPals, isError: isErrorTrainingPals } = useGetTrainingPalsQuery();

    return (
        <div className='partners-list-wrapper'>
            <h4 className='partners-list__title'>Мои партнёры по тренировкам</h4>
            {!dataTrainingPals?.length ? (
                <p className='partners-list__empty-subtitle'>
                    У вас пока нет партнёров для совместных тренировок
                </p>
            ) : (
                <List
                    className='partners-list'
                    dataSource={dataTrainingPals}
                    renderItem={(item, index) => (
                        <List.Item key={item.id + 'partnerCard'}>
                            <PartnerCard index={index} type={'short'} user={item} />
                        </List.Item>
                    )}
                />
            )}
            {}
            {/* <List
                className='partners-list'
                dataSource={['short', 'full']}
                renderItem={(item) => (
                    <List.Item key={item}>
                        <PartnerCard type={item} />
                    </List.Item>
                )}
            /> */}
            {/* <PartnerCard type='short' />
            <PartnerCard type='full' /> */}
        </div>
    );
};
