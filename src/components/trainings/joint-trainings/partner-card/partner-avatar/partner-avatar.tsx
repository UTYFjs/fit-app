import { Avatar } from 'antd';
import './partner-avatar.css';
import { UserOutlined } from '@ant-design/icons';
import { Nullable } from '../../../../../types/common-types';

type PartnerCardProps = {
    imageSrc: Nullable<string>;
    name: string;
};

export const PartnerAvatar = ({ imageSrc, name }: PartnerCardProps) => (
    <div className='partner__avatar'>
        <Avatar
            size={42}
            src={imageSrc}
            alt={name}
            icon={
                !imageSrc && <UserOutlined style={{ color: 'var(--character-light-title-85)' }} />
            }
        />
        <p className='partner-card__name'>{name}</p>
    </div>
);
