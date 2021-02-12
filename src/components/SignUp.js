import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';

const SignUp = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const { signup } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      // return so that we exit and do not continue executing
      console.log('asdfas');
      return setError('Passwords do not match.');
    }

    try {
      setError('');
      setLoading(true);
      // createwUserPw in signup is async so we must use try block along with async/await
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Sign up</h2>
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
            <Form.Group id='password-confirm'>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                required
                ref={confirmPasswordRef}
              />
            </Form.Group>
            <Button disabled={loading} type='submit' className='w-100'>
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        Already have an account? <Link to='/login'>Log in</Link>
      </div>
    </>
  );
};

export default SignUp;
