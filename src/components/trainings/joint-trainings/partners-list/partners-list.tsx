import { List } from 'antd';
import { PartnerCard } from '../partner-card/partner-card';
import './partners-list.css';
import { useLazyGetTrainingPalsQuery } from '@services/training-api';
import { useEffect, useState } from 'react';
import { ModalError } from '@components/modal-error/modal-error';
import { SaveErrorCard } from '@components/modal-error/save-error-card/save-error-card';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getPartnersList } from '@redux/training-slice';

const gridParameters = {
    gutter: 16,
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
};
export const PartnersList = () => {
    const [getTrainingPals] = useLazyGetTrainingPalsQuery();
    const partnerList = useAppSelector(getPartnersList);

    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

    useEffect(() => {
        getTrainingPals()
            .unwrap()
            .then(() => {})
            .catch(() => {
                setIsModalErrorOpen(true);
            });
    }, [getTrainingPals]);

    const handleCloseErrorModal = () => setIsModalErrorOpen(false);
    return (
        <div className='partners-list-wrapper'>
            <h4 className='partners-list__title'>Мои партнёры по тренировкам</h4>
            {partnerList?.length ? (
                <List
                    className='partners-list'
                    dataSource={partnerList}
                    renderItem={(item, index) => (
                        <List.Item key={item.id + 'partnerCard'}>
                            <PartnerCard index={index} type={'short'} user={item} />
                        </List.Item>
                    )}
                    grid={gridParameters}
                />
            ) : (
                <p className='partners-list__empty-subtitle'>
                    У вас пока нет партнёров для совместных тренировок
                </p>
            )}
            <ModalError isOpen={isModalErrorOpen} width={416} isClosable={false}>
                <SaveErrorCard handlePrimeButton={handleCloseErrorModal} />
            </ModalError>
        </div>
    );
};
