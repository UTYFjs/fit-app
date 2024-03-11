import {  Button,  Drawer, Form, Input, InputNumber } from 'antd';
import type { Moment } from 'moment';

import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import './drawer-calendar.css';
import BadgeTraining from '@components/badge-training/badge-training';


type DrawerCalendarProps = {
  
  isDrawerOpen: boolean;
  onClose: () => void;
  calendarDate?: Moment | null;

};


const DrawerCalendar = ({ isDrawerOpen, onClose, calendarDate = null }: DrawerCalendarProps) => {

  const date = calendarDate?.format('DD.MM.YYYY')
  console.log('date', date);
  const onFinish = (data: string[]) => {
    console.log(data)
  }
  return (
    <Drawer
      className='drawer-calendar'
      title={<>
        <div className='drawer-calendar__title-wrapper'> <PlusOutlined /> <div className='drawer-calendar__title'>Добавление упражнений</div> </div>
      </>}
      extra={<Button
        data-test-id=''
        type='text'
        size='small'
        icon={<CloseOutlined />}
        onClick={onClose}
      />}
      placement={'right'}
      closable={false}
      onClose={onClose}
      open={isDrawerOpen}
      mask={true}
      maskStyle={{ background: 'none' }}
      drawerStyle={{ borderRadius: '8px 0 0 8px' }}
      headerStyle={{ padding: '24px 32px 16px', borderBottom: 'none' }}
      bodyStyle={{ padding: '0 32px 24px', borderRadius: '8px 0 0 8px' }}
    >
      <>
        <div className='drawer-calendar__badge'>
          <BadgeTraining text='Силовая' /> <span>{date}</span>
        </div>
        
     
          <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" onChange={(e) => {console.log((e.target as HTMLInputElement).name)}}>
            <Form.List name="exercises">
              {(fields, { add }) => (
                <div className='drawer-calendar__exercise-list'>
                  {fields.map(({ key}) => (
                    <div  className='exercise-item' key={key} >

                      <Input className='exercise-item__input-title' placeholder="Упражнение" size='small' />
                      <div className='exercise-item__values'>
                        <div>
                          <div className='exercise-item__label'> Подходы </div>
                          <InputNumber className='exercise-item__input-approaches' addonBefore='+' min={1} placeholder="1" size='small' />
                        </div>
                        <div className='exercise-item__values_second' >
                          <div>
                            <div className='exercise-item__label'> Вес, кг </div>
                            <InputNumber className='exercise-item__input-weight' min={0} placeholder="0" size='small'/>
                          </div>
                          <div className='input-divider'> x </div>
                          <div>
                            <div className='exercise-item__label'> Количество </div>
                            <InputNumber className='exercise-item__input-count' min={1} placeholder="3" size='small' />
                          </div>
                        </div>
                        
                      </div>
                        
             
                      
                    </div>
                  ))}
                  <Form.Item>
                    <Button className='drawer-calendar__btn-add' onClick={() => add()} type='text' size='large' icon={<PlusOutlined />} style={{ width: '100%', display: 'flex', alignItems: 'center' }}>  Добавить еще </Button>
                    
                  </Form.Item>
                </div>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>

      </>

    </Drawer>
  );
};

export default DrawerCalendar;
