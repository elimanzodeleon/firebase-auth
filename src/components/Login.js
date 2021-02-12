import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';

const Login = () => {
  // state values
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // following useRefs are used to grab values from input rather than onchange+value
  const emailRef = useRef();
  const passwordRef = useRef();

  // auth custom hook
  const { login } = useAuthContext();

  // history to reroute user on successful login
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // attempt to log in user with provided credentials
    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);

      history.push('/');
    } catch (err) {
      console.log(err);
      setError('Incorrect email/password.');
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Log in</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Control
                type='email'
                placeholder='Enter email'
                required
                ref={emailRef}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Control
                type='password'
                placeholder='Password'
                required
                ref={passwordRef}
              />
            </Form.Group>

            <Button disabled={loading} type='submit' className='w-100'>
              Log in
            </Button>
          </Form>
          <div className='w-100 text-center mt-2'>
            <Link to='/forgot-password'>Forgot password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Don't have an account? <Link to='/signup'>Sign up</Link>
      </div>
    </>
  );
};

export default Login;
