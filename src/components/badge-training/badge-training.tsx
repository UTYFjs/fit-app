
import { Badge, Button } from 'antd';
import './badge-training.css';
import { EditOutlined } from '@ant-design/icons';
import getBadgeColor from '@utils/get-badge-color';
import classNames from 'classnames';
import { getCssVar } from '@utils/get-css-var';


type BadgeTrainingProps = {
  text: string;
  isDisable?: boolean;
  isEditButton?: boolean;
  isGray?: boolean;
  isShort?: boolean;
  onClickBadge?: ()=> void
};


const BadgeTraining = ({ text, isDisable = false, isEditButton= false, isGray = false,isShort = false, onClickBadge }: BadgeTrainingProps) => {
  
 const color = getBadgeColor(text)
  const classBadge = classNames('badge__traning-item',isGray? 'badge__training-item_gray' : isShort ? 'badge__traning-item_small' : 'badge__traning-item_big', isDisable ? 'badge__training-item_disable': '' )
  return (
    <div className={classBadge} > <Badge  color={color} text={text} /> 
      {isEditButton && <Button className='badge__button' 
                           type='text' 
                           size='small' 
                           disabled={isDisable}
                           onClick={onClickBadge}
                           icon={<EditOutlined disabled={isDisable} 
                                               style={{color: isDisable ? getCssVar('--character-light-disable-25') : getCssVar('--primary-light-6')}}
                                               //className='badge__training-item_icon'  
                                               />}/>}
                                  </div>

  );
};

export default BadgeTraining;
