import React, { useEffect, useState } from 'react';
import styles from './login.module.css';
import 'antd/dist/antd.css';
import { Button, Checkbox, Form, Input } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { validationPassword } from '@utils/validation';
import { messageValidation, regExpEmail } from '@constants/validation';
import { useCheckEmailMutation, useLoginMutation } from '@services/auth-api';
import { ILoginData } from '../..//types/forms';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@constants/api';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { setAccessToken, setUserValues } from '@redux/user-slice';




export const Login: React.FC = () => {
    const [form] = Form.useForm();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [login] = useLoginMutation();
    const [checkEmail] = useCheckEmailMutation();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const {accessToken} = useAppSelector((state) => state.user)
    const {email} = useAppSelector((state) => state.user)
    const { previousLocations } = useAppSelector((state) => state.router);

    useEffect(() => {
        if(accessToken){ navigate(Paths.MAIN)}
    }, [accessToken, navigate])

    useEffect(() => {
        if (previousLocations?.[1]?.location?.pathname === Paths.ERROR_CHECK_EMAIL) {
            console.log('Login from error page');
           checkEmail({ email: email })
               .unwrap()
               .then(() => {
                console.log('проверка почты')
                navigate(Paths.CONFIRM_EMAIL)
               })
               .catch((e) => {
                   //console.log('error', e.status === 404 && e.data.message === 'Email не найден', e);
                   if (e.status === 404 && e.data.message === 'Email не найден') {
                       console.log('error 404 не найден', e);
                       navigate(Paths.ERROR_CHECK_EMAIL_NO_EXIST);
                   } else {
                       navigate(Paths.ERROR_CHECK_EMAIL);
                   }
               });
        }
    }, [previousLocations]);
    
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 768);
        });


    const handleForgotPassword = () =>{
        const email = form.getFieldValue('email') as string
        if (regExpEmail.test(email)){
            
            console.log('forgot password  valid email');
            dispatch(setUserValues({email: email, password: '', passwordRepeat: ''}))

        checkEmail({email: email})
        .unwrap()
        .then(() => {
            console.log('проверка почты');
        navigate(Paths.CONFIRM_EMAIL);})
        .catch((e) =>{
            //console.log('error', e.status === 404 && e.data.message === 'Email не найден', e);
            if(e.status === 404 && e.data.message === 'Email не найден'){
                console.log('error 404 не найден', e);
                navigate(Paths.ERROR_CHECK_EMAIL_NO_EXIST)
            }else {
            navigate(Paths.ERROR_CHECK_EMAIL);
            }

            
        }) }
        else {
        console.log('forgot password dont valid email');
        }

    }
    const onFinish = (values: ILoginData) => {
        login({email: values.email, password: values.password}).unwrap()
        .then((data) => {
            values.remember ? localStorage.setItem('accessToken', data.accessToken) : '';
            dispatch(setAccessToken(data.accessToken));
            console.log('values Login', values);
            navigate(Paths.MAIN)
        })
        .catch((e)=>{
            navigate(Paths.ERROR_LOGIN);

        })
        console.log('Success:', values);
    };


  return (
      <Form
          form={form}
          name='normal_login'
          className={styles['form_login']}
          initialValues={{ remember: true }}
          onFinish={onFinish}
      >
          <Form.Item
              name='email'
              rules={[
                  { required: true, message: '' },
                  { type: 'email', message: '' },
              ]}
              style={{ marginBottom: 32 }}
          >
              <Input addonBefore='e-mail' size='large' data-test-id='login-email' />
          </Form.Item>

          <Form.Item
              name='password'
              rules={[
                  {
                      required: true,
                      validator: validationPassword,
                      message: messageValidation.password,
                  },
              ]}
          >
              <Input.Password
                  type='password'
                  placeholder='Пароль'
                  size='large'
                  data-test-id='login-password'
              />
          </Form.Item>
          <div className={styles['form-item_check-area']}>
              <Form.Item name='remember' valuePropName='checked' noStyle>
                  <Checkbox className={styles['checkbox_remember']} data-test-id='login-remember'>
                      Запомнить меня
                  </Checkbox>
              </Form.Item>
              <Button
                  type='text'
                  size='small'
                  className={styles['login-form-forgot']}
                  data-test-id='login-forgot-button'
                  onClick={handleForgotPassword}
              >
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
                  data-test-id='login-submit-button'
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
