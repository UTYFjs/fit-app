import { CloseOutlined } from '@ant-design/icons';
import { Button, Drawer } from 'antd';
import './drawer-custom.css';

import { CalendarDataTeatId } from '@constants/data-test-id';

import { ReactNode } from 'react';
import { useWindowWidth } from '@hooks/useWindowWidth';

type DrawerCalendarProps = {
    drawerTitle: string;
    children: ReactNode;
    isDrawerOpen: boolean;
    onClose: () => void;
    drawerTitleIcon?: ReactNode;
    footer?: ReactNode;
};

const DrawerCustom = ({
    drawerTitle,
    children,
    isDrawerOpen,
    onClose,
    drawerTitleIcon,
    footer,
}: DrawerCalendarProps) => {
    const { isDesktop } = useWindowWidth();

    return (
        <Drawer
            className='drawer-custom'
            data-test-id={CalendarDataTeatId.MODAL_DRAWER_RIGHT}
            title={
                <>
                    <div className='drawer-calendar__title-wrapper'>
                        {drawerTitleIcon}
                        <div className='drawer-calendar__title'>{drawerTitle}</div>
                    </div>
                </>
            }
            extra={
                <Button
                    data-test-id={CalendarDataTeatId.MODAL_DRAWER_RIGHT_BUTTON_CLOSE}
                    type='text'
                    size='small'
                    icon={<CloseOutlined />}
                    onClick={onClose}
                />
            }
            destroyOnClose
            width={408}
            height={isDesktop ? 'auto' : '87%'}
            placement={isDesktop ? 'right' : 'bottom'}
            closable={false}
            onClose={onClose}
            open={isDrawerOpen}
            mask={true}
            maskStyle={{ background: 'transparent' }}
            drawerStyle={{ borderRadius: '8px 0 0 8px' }}
            footerStyle={{ padding: isDesktop ? '12px 32px' : '12px' }}
            footer={footer}
        >
            <div className='drawer-wrapper'>{children}</div>
        </Drawer>
    );
};
export default DrawerCustom;
