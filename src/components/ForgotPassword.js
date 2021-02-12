import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const emailRef = useRef();
  const { resetPassword } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setAlert({});
      await resetPassword(emailRef.current.value);
      setAlert({
        message: 'Please check your inbox for further instructions.',
        type: 'success',
        success: true,
      });
    } catch (error) {
      setAlert({
        message: 'This user does not exist.',
        type: 'danger',
        success: false,
      });
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-3'>Reset password</h2>
          {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Control
                required
                type='email'
                ref={emailRef}
                placeholder='Enter email'
              />
            </Form.Group>
            <Button disabled={loading} type='submit' className='w-100'>
              Reset password
            </Button>
            <div className='w-100 text-center mt-3'>
              <Link to='/login'>{alert.success ? 'Log in' : 'Cancel'}</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
