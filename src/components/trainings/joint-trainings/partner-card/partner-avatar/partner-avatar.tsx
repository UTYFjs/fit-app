import { Avatar } from 'antd';
import './partner-avatar.css';
import { UserOutlined } from '@ant-design/icons';

type PartnerCardProps = {
    imageSrc: string | null;
    name: string;
};

export const PartnerAvatar = ({ imageSrc, name }: PartnerCardProps) => (
    <div className='partner__avatar'>
        <Avatar size={42} src={imageSrc} alt={name} icon={!imageSrc && <UserOutlined />} />
        <p className='partner-card__name'>{name}</p>
    </div>
);
