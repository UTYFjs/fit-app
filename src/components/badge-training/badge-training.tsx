
import { Badge, Button } from 'antd';
import type { Moment } from 'moment';
import './badge-training.css';
import { EditOutlined } from '@ant-design/icons';



type BadgeTrainingProps = {
  text: string;

};


const BadgeTraining = ({ text }: BadgeTrainingProps) => {
  


  return (
    <div className='traning-item'> <Badge color='cyan' text={text} /> <Button type='text' size='small'> <EditOutlined /></Button></div>

  );
};

export default BadgeTraining;
