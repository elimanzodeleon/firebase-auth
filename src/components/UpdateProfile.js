import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');
  const history = useHistory();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const { currentUser, updateEmail, updatePassword } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if passwords match before attempting to update
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setAlert({
        message: 'Password do not match.',
        type: 'danger',
        success: false,
      });
    }

    setLoading(true);
    setAlert('');

    // handle updatePw and updateEmail promises so we could resolve/reject simultaneously
    const promises = [];
    // check if new email does not match current
    if (emailRef.current.value !== currentUser.email) {
      // new email so add the updateEmail promise
      promises.push(updateEmail(emailRef.current.value));
    }
    // check if user updated password
    if (passwordRef.current.value) {
      // new pw so add the updatePw promise
      promises.push(updatePassword(passwordRef.current.value));
    }

    // resolve promises
    Promise.all(promises)
      .then(() => {
        // all promises resolved successfully, redirect(push) user to dashboard
        setAlert({
          message: 'Successfully updated profile.',
          type: 'success',
          success: true,
        });
      })
      .catch((error) => {
        console.log('error updating account: ', error);
        setAlert({
          message: 'Unable to update account.',
          type: 'danger',
          success: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='w-100 text-center mb-3'>Update profile</h2>
          {alert.message && <Alert variant={alert.type}>{alert.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
              {/* give its current value whatever the current users email is */}
              <Form.Control
                required
                type='email'
                ref={emailRef}
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                ref={passwordRef}
                placeholder='Enter new password'
              />
              <Form.Text className='text-muted'>
                Leave blank to keep the same password.
              </Form.Text>
            </Form.Group>
            <Form.Group id='confirm-password'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                ref={confirmPasswordRef}
                placeholder='Enter new password'
              />
            </Form.Group>
            <Button disabled={loading} type='submit' className='w-100'>
              Save
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Link to='/'>{alert.success ? 'Return to dashboard' : 'Cancel'}</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
