import { ReactNode } from 'react';
import styles from './custom-card-action.module.css';
import 'antd/dist/antd.css';
import { Card } from 'antd';

interface ICustomCardActionProps {
    title: string;
    actions: ReactNode[];
}
export const CustomCardAction: React.FC<ICustomCardActionProps> = ({title, actions}) => 
     (
        <Card
            bordered={false}
            actions={actions}
            className={styles['custom-card']}
            title={title}
        >
           
        </Card>
    );

