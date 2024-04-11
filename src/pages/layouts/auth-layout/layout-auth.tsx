import 'antd/dist/antd.css';
import './layout-auth.css';
import { Outlet } from 'react-router-dom';

export const LayoutAuth = () => {
    return (
        <div className='layout_auth'>
            <div className='main_auth'>
                <Outlet />
            </div>
        </div>
    );
};
