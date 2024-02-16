import React from 'react';

import 'antd/dist/antd.css';
import './layout-main.css';
import {  Layout } from 'antd';
import { Outlet } from 'react-router-dom';



export const LayoutMain: React.FC = () => 
     (
        <Layout className='app'>
          <Outlet/>
        </Layout>
    );

