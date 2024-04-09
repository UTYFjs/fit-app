import { Avatar } from 'antd';
import './partner-avatar.css';
import { UserOutlined } from '@ant-design/icons';
import { HighlightedText } from '@components/highlighted-text/highlighted-text';

type PartnerCardProps = {
    imageSrc: string | null;
    name: string;
};

export const PartnerAvatar = ({ imageSrc, name }: PartnerCardProps) => {
    const [firstName, lastName] = name.split(' ');
    return (
        <div className='partner__avatar'>
            <Avatar size={42} src={imageSrc} alt={name} icon={!imageSrc && <UserOutlined />} />
            {/* {!imageSrc && <Avatar size={42} />} */}
            <div>
                <p className='partner-card__name'>{name}</p>
                {/* <p className='partner__name'>{name ? firstName : 'Пользователь'}</p>
                <p className='partner__name'>{lastName}</p> */}
            </div>
        </div>
    );
};
