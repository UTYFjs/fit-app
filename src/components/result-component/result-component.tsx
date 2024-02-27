import React from 'react';
import  './result-component.css';
import 'antd/dist/antd.css';
import { Button, Result } from 'antd';

import { resultData } from '@constants/result-data';

import { useLocation, useNavigate } from 'react-router-dom';



export const ResultComponent: React.FC = () => {
    
    const {pathname} = useLocation()
    const navigate = useNavigate();

    const data = resultData.find((item) =>  item.url === pathname)

    const handleGoTo = () => {
        if(data) navigate(data.buttonLink)
    }
   
    return (
               <Result
                status={data?.status}
                title={data?.title}
                subTitle={data?.description}
                extra={
                    <Button type='primary' size='large' data-test-id={data?.dataTestId} onClick={handleGoTo}>
                        {data?.buttonText}
                    </Button>
                }
                className='result-card'
            />
    );
};
