import { Result } from 'antd';

export const InDeveloping = () => (
    <div className='not-found__container'>
        <Result
            className='not-found'
            status='404'
            title={<p className='not-found__title'>Данный раздел Еще в разработке</p>}
        />
    </div>
);
