import { Button, Result } from 'antd';
import './not-found.css';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoToMain = () => navigate('/main');
    return (
        <div className='not-found__container'>
            <Result
                className='not-found'
                status='404'
                title={<p className='not-found__title'>Такой страницы нет</p>}
                subTitle={
                    <p>Извините, страница не найдена, возможно, она была удалена или перемещена.</p>
                }
                extra={
                    <Button type='primary' onClick={handleGoToMain} size='large'>
                        На главную
                    </Button>
                }
            ></Result>
        </div>
    );
};
export default NotFound;
