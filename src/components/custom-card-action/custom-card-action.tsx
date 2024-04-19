import { ReactNode } from 'react';

import styles from './custom-card-action.module.css';

import 'antd/dist/antd.css';
import { Card } from 'antd';

type ICustomCardActionProps = {
    title: string;
    actions: ReactNode[];
    children?: ReactNode[];
};
export const CustomCardAction: React.FC<ICustomCardActionProps> = ({
    title,
    actions,
    children,
}) => (
    <Card bordered={false} actions={actions} className={styles['custom-card']} title={title}>
        {children}
    </Card>
);
