import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Card, Button, Alert } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  const { currentUser, logout } = useAuthContext();

  const handleLogout = async () => {
    try {
      setError('');
      setLoading(true);
      await logout();
      history.push('/login');
    } catch (err) {
      console.log(err);
      setError('unable to log out user');
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Dashboard</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <div className='d-flex justify-content-center'>
            <strong>hello, {currentUser?.email}</strong>
          </div>
          <Link to='/update-profile' className='btn btn-primary w-100 mt-3'>
            Update profile
          </Link>
        </Card.Body>
      </Card>
      <div className='w-100 text-center mt-2'>
        <Button variant='link' onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
