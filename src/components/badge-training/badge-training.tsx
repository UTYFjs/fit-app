
import { Badge, Button } from 'antd';
import './badge-training.css';
import { EditOutlined } from '@ant-design/icons';
import getBadgeColor from '@utils/get-badge-color';
import classNames from 'classnames';
import { getCssVar } from '@utils/get-css-var';
import { CalendarDataTeatId } from '@constants/data-test-id';


type BadgeTrainingProps = {
  text: string;
  isDisable?: boolean;

  isGray?: boolean;
  isShort?: boolean;
  onClickBadge?: ()=> void
  dataTestIdEdit?: string
};


const BadgeTraining = ({ text, isDisable = false, isGray = false, isShort = false, onClickBadge }: BadgeTrainingProps) => {
  
 const color = getBadgeColor(text)
  const classBadge = classNames('badge__traning-item',isGray? 'badge__training-item_gray' : isShort ? 'badge__traning-item_small' : 'badge__traning-item_big', isDisable ? 'badge__training-item_disable': '' )
  return (
    <div className={classBadge} > <Badge  color={color} text={text} /> 
                                        </div>

  );
};

export default BadgeTraining;
