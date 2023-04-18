import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/auth/authContext';
import Card from '../card';
import ContactButton from '../home/contactButton';
import Logo from '../home/logo';
import '../../components.css';

function Login() {
  const { auth, login, logout } = useAuth();
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const LoginForm = () => {
    return (
      <Formik validateOnMount
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email('Invalid Email Address')
            .required('Required'),
          password: Yup.string()
            .min(8, 'Must Be At Least 8 Characters')
            .required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          login(values.email, values.password);
          setSubmitting(false);
          setShow(false);
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email Address
              </label>
              <Field
                name='email'
                type='email'
                placeholder='Enter email'
                className='form-control'
              />

              <ErrorMessage name='email' />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Password
              </label>
              <Field
                name='password'
                type='password'
                placeholder='Enter password'
                className='form-control'
              />
              <ErrorMessage name='password' />
            </div>
            <button
              type='submit'
              className='btn btn-dark'
              disabled={isSubmitting || !isValid}
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    );
  };

  function clearForm() {
    setEmail('');
    setPassword('');
    setShow(true);
  }

  function logOut() {
    logout();
    clearForm();
  }

  return (
    <>
     <Logo>
      <Card
        bgcolor='light'
        txtcolor='black'
        header='Login'
        body={
          show ? (
            <>
              <LoginForm />
            </>
          ) : (
            <>
              { auth ? (
                <>
                  <h5 className='welcome-text'>Welcome ${auth.displayName} </h5>
                  <div className='btn-container'>
                  <button
                    type='submit'
                    className='btn btn-dark'
                    onClick={logOut}
                  >
                    Log Out
                  </button>
                  <Link className='btn btn-dark' role='button' to='../dashboard'>
                    Go To Account
                  </Link>
                  </div>
                </>
              ) : (
                <>
                  <h5>Please Create An Account</h5>
                  <Link
                    className='btn btn-dark'
                    role='button'
                    to='../createaccount'
                  >
                    Create Account
                  </Link>
                </>
              )}
            </>
          )
        }
      />
     
      <ContactButton />
      </Logo>
    </>
  );
}

export default Login;