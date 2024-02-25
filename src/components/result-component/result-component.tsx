import React, { useEffect, useState } from 'react';
import  './result-component.css';
import 'antd/dist/antd.css';
import { Button, Result } from 'antd';

import { resultData } from '@constants/result-data';
import Loader from '@components/loader/loader';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { isLoadingState } from '@redux/app-slice';
import { useLocation, useNavigate } from 'react-router-dom';


export const ResultComponent: React.FC = () => {
    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const isLoading = useAppSelector(isLoadingState);
    const {pathname, state} = useLocation()

    const navigate = useNavigate();
    const data = resultData.find((item) =>  item.url === pathname)

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });
    const handleGoTo = () => {
        if(data){
            navigate(data.buttonLink);

        }

    }
   
    return (
        <>
            {isLoading && <Loader />}
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
        </>
    );
};
