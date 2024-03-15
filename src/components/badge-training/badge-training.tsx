
import { Badge, Button } from 'antd';
import './badge-training.css';
import { EditOutlined } from '@ant-design/icons';
import getBadgeColor from '@utils/get-badge-color';
import classNames from 'classnames';


type BadgeTrainingProps = {
  text: string;
  isEditButton?: boolean;
  isGray?: boolean;
  isShort?: boolean;
  onClickBadge?: ()=> void
};


const BadgeTraining = ({ text, isEditButton= false, isGray = false,isShort = false, onClickBadge }: BadgeTrainingProps) => {
  
 const color = getBadgeColor(text)
  const classBadge = classNames('badge__traning-item',isGray? 'badge__training-item_gray' : isShort ? 'badge__traning-item_small' : 'badge__traning-item_big' )
  return (
    <div className={classBadge} onClick={onClickBadge}> <Badge className='' color={color} text={text} /> 
      {isEditButton && <Button className='badge__button' 
                           type='text' 
                           size='small' 

                           icon={<EditOutlined className='badge__training-item_icon' />}/>}
                                  </div>

  );
};

export default BadgeTraining;
