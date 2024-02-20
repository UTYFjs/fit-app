import React, { useEffect, useState } from 'react';
import  './result-component.css';
import 'antd/dist/antd.css';
import { Button, Checkbox, Form, Input, Result } from 'antd';
import { GooglePlusOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import { resultData } from '@constants/result-data';


export const ResultComponent: React.FC = () => {
    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth < 768);
    });
const data = resultData;
   
    return (
        <Result
            status={resultData[2].status}
            title={resultData[2].title}
            subTitle={resultData[2].description}
            extra={
                <Button type='primary' size='large' data-test-id={resultData[2].dataTestId}>
                    {resultData[2].buttonText}
                </Button>
            }
            className='result-card'
        />
    );
};
