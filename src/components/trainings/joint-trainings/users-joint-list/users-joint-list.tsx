import { Button, List, Input } from 'antd';
import { PartnerCard } from '../partner-card/partner-card';
import './users-joint-list.css';
import { UserJointTrainingListType } from '@types/training-types';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { TrainingDataTestId } from '@constants/data-test-id';

const { Search } = Input;
type UserJointListProps = {
    users: UserJointTrainingListType[];
    handleGoBack: () => void;
};
export const UserJointList = ({ users, handleGoBack }: UserJointListProps) => {
    const [searchValue, setSearchValue] = useState('');

    const onSearch = (search: string) => {
        setSearchValue(search);
        console.log('onSearch event', search);
    };
    return (
        <div className='users-joint-list-wrapper'>
            <div className='user-joint-list__header'>
                <Button
                    className='user-joint-list__btn-back'
                    type='text'
                    size='large'
                    icon={<ArrowLeftOutlined style={{ fontSize: 12 }} />}
                    onClick={handleGoBack}
                >
                    Назад
                </Button>
                <div>
                    {' '}
                    <Search
                        data-test-id={TrainingDataTestId.SEARCH_INPUT}
                        className='user-joint-list__search'
                        placeholder='Поиск по имени'
                        onSearch={(search) => {
                            onSearch(search);
                        }}
                    />
                </div>
            </div>

            <List
                className='partners-list'
                dataSource={users}
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 2,
                    lg: 3,
                    xl: 4,
                }}
                renderItem={(item) => (
                    <List.Item key={item.id + 'partnerCard'}>
                        <PartnerCard type={'full'} user={item} searchValue={searchValue} />
                    </List.Item>
                )}
                //pagination={}
            />
        </div>
    );
};
