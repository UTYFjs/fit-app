import React, { useEffect } from 'react';

import 'antd/dist/antd.css';
import './layout-auth.css';
import { Outlet } from 'react-router-dom';

export const LayoutAuth: React.FC = () => { 
  
  useEffect(() => {
  const appElement = document.querySelector('.app') as HTMLElement;
  let background = '';
  if (appElement) {
     background = appElement.style.background;
    appElement.style.background = 'no-repeat center/cover url(\'/public/Enter_page_light.png\')';
  }
  return function (){
    if(appElement){
      appElement.style.background = background;
    }
  }
  }, [])



  return (
    
    <div className='layout_auth'>     
      <div className='main_auth'>
        <Outlet />
      </div>
    </div>
)}
;
