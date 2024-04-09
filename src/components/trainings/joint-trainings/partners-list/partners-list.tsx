import { List } from 'antd';
import { PartnerCard } from '../partner-card/partner-card';
import './partners-list.css';
import { useGetTrainingPalsQuery, useLazyGetTrainingPalsQuery } from '@services/training-api';
import { useEffect, useState } from 'react';
import ModalError from '@components/modal-error/modal-error';
import SaveErrorCard from '@components/modal-error/save-error-card/save-error-card';
import OpenErrorCard from '@components/modal-error/open-error-card/open-error-card';

export const PartnersList = () => {
    //const { data: dataTrainingPals, isError: isErrorTrainingPals } = useGetTrainingPalsQuery();
    const [getTrainingPals, { data: dataTrainingPals }] = useLazyGetTrainingPalsQuery();
    const [isModalErrorOpen, setIsModalErrorOpen] = useState(false);

    useEffect(() => {
        getTrainingPals()
            .unwrap()
            .then(() => {})
            .catch(() => {
                setIsModalErrorOpen(true);
            });
    }, [getTrainingPals]);

    const handleRefetch = () => {
        setIsModalErrorOpen(false);
        getTrainingPals()
            .unwrap()
            .then(() => {})
            .catch(() => {
                setIsModalErrorOpen(true);
            });
    };
    // useEffect(() => {
    //     if (isErrorTrainingPals) setIsModalErrorOpen(true);
    // }, [isErrorTrainingPals]);

    const handleCloseErrorModal = () => setIsModalErrorOpen(false);
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

            {
                <ModalError
                    isOpen={isModalErrorOpen}
                    width={416}
                    isClosable={false}
                    //onCancel={handleCloseErrorModal}
                >
                    {/* <OpenErrorCard handlePrimeButton={handleRefetch} /> */}
                    <SaveErrorCard handlePrimeButton={handleCloseErrorModal} />
                </ModalError>
            }

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
