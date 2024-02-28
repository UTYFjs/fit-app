import { Button, Result } from 'antd';
import { resultData } from '@constants/result-data';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paths } from '@constants/api';
import './result-component.css';
import 'antd/dist/antd.css';


export const ResultComponent = () => {
    
    const {pathname} = useLocation()
    const navigate = useNavigate();

    const data = resultData.find((item) =>  item.url === pathname)
    const isBtnFitContent =
        (pathname === Paths.ERROR_CHECK_EMAIL_NO_EXIST || pathname === Paths.ERROR_CHECK_EMAIL);
    const handleGoTo = () => {
        if(data) navigate(data.buttonLink)
    }
   
    return (
               <Result
                status={data?.status}
                title={data?.title}
                subTitle={data?.description}
                extra={
                    <Button className={isBtnFitContent? 'ant-btn-fit-content' : ''} type='primary' size='large' data-test-id={data?.dataTestId} onClick={handleGoTo}>
                        {data?.buttonText}
                    </Button>
                }
                className='result-card'
            />
    );
};
