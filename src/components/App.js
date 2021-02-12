import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from './SignUp';
import { Container } from 'react-bootstrap';
import PrivateRoute from './PrivateRoute';
import AuthProvider from '../contexts/AuthContext';
import Dashboard from './Dashboard';
import Login from './Login';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';

function App() {
  return (
    <Container
      className='d-flex align-items-center justify-content-center'
      style={{ minHeight: '100vh' }}
    >
      <div className='w-100' style={{ maxWidth: '400px' }}>
        {/* here is where logic/componenets begin */}
        <AuthProvider>
          <Router>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <Route exact path='/signup' component={SignUp} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/forgot-password' component={ForgotPassword} />
              <PrivateRoute
                exact
                path='/update-profile'
                component={UpdateProfile}
              />
            </Switch>
          </Router>
        </AuthProvider>
      </div>
    </Container>
  );
}

export default App;
