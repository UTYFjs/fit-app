import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import 'antd/dist/antd.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';




export const Login: React.FC = () => {
    const [form] = Form.useForm();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 768);
        });



    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

      const validatePassword = (_: any, value: string) => {
          if (value && value.length < 8) {
              return Promise.reject('Пароль должен содержать не менее 8 символов');
          }
          if (value && !/[A-Z]/.test(value)) {
              return Promise.reject('Пароль должен содержать заглавную букву');
          }
          if (value && !/\d/.test(value)) {
              return Promise.reject('Пароль должен содержать цифру');
          }
          return Promise.resolve();
      };

  return (
      <Form
          name='normal_login'
          className={styles['form_login']}
          initialValues={{ remember: true }}
          onFinish={onFinish}
      >
          <Form.Item
              name='username'
              rules={[{ required: true, message: '' }]}
              style={{ marginBottom: 32 }}
          >
              <Input addonBefore='e-mail' size='large' />
          </Form.Item>
         
              <Form.Item
                  name='password'
                  rules={[
                      {
                          required: true,
                          //validator: validatePassword,
                          message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                      },
                  ]}
                  //validateStatus={getPasswordValidationStatus('password')}                  
              >
                  <Input.Password type='password' placeholder='Пароль' size='large' />
              </Form.Item>
              <div className={styles['form-item_check-area']} >
                  <Form.Item name='remember' valuePropName='checked' noStyle>
                      <Checkbox className={styles['checkbox_remember']}>Запомнить меня</Checkbox>
                  </Form.Item>
                  <Button type='text' size='small' className={styles['login-form-forgot']}>
                      Забыли пароль?
                  </Button>
              </div>
          <Form.Item style={{ marginBottom: 16 }}>
              <Button
                  type='primary'
                  htmlType='submit'
                  size='large'
                  style={{ width: '100%' }}
                  className={styles['login-form-button']}
              >
                  Войти
              </Button>
          </Form.Item>
          <Button
              type='default'
              htmlType='button'
              size='large'
              icon={isMobile ? '' : <GooglePlusOutlined />}
              className={styles['login-form-button_google']}
          >
              Войти через Google
          </Button>
      </Form>
  );};
