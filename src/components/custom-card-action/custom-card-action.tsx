import React, { ReactNode } from 'react';
import styles from './custom-card-action.module.css';
import 'antd/dist/antd.css';
import { Card, Button } from 'antd';
import {  HeartFilled } from '@ant-design/icons';

const { Meta } = Card;


interface ICustomCardActionProps {
    title: string;
    actions: ReactNode[];
}
export const CustomCardAction: React.FC<ICustomCardActionProps> = ({title, actions}) => {
    return (
        <Card
            bordered={false}
            actions={actions}
            className={styles['custom-card']}
        >
            <Meta title={title} />
        </Card>
    );
};
