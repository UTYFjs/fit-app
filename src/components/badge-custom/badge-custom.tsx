import './badge-custom.css';
import classNames from 'classnames';
import { ReactNode } from 'react';
import { useAppSelector } from '@hooks/typed-react-redux-hooks';
import { getCountInvites } from '@redux/invite-slice';
import { TrainingDataTestId } from '@constants/data-test-id';
import { useWindowWidth } from '@hooks/useWindowWidth';

type BadgeCustomProps = {
    icon: ReactNode;
    isCollapsed?: boolean;
};

export const BadgeCustom = ({ icon, isCollapsed }: BadgeCustomProps) => {
    const { width } = useWindowWidth();
    const countInvites = useAppSelector(getCountInvites);

    return (
        <>
            {countInvites === 0 || (width < 976 && isCollapsed) ? (
                icon
            ) : (
                <span
                    className={classNames(
                        'ant-badge',
                        'ant-menu-item-icon',
                        'badge-custom-wrapper',
                    )}
                >
                    {icon}
                    <sup
                        data-test-id={TrainingDataTestId.NOTIFICATION_ABOUT_JOINT_TRAINING}
                        data-show='true'
                        className={classNames(
                            'ant-scroll-number ant-badge-count',
                            'ant-badge-count-sm',
                            isCollapsed && 'badge_menu-collapsed',
                        )}
                        title={`${countInvites}`}
                    >
                        <span className='ant-scroll-number-only'>
                            <span className='ant-scroll-number-only-unit current'>
                                {countInvites}
                            </span>
                        </span>
                    </sup>
                </span>
            )}
        </>
    );
};
