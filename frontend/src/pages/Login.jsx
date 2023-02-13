import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import NavBar from '../components/Navbars/NavBar';
import Tabs from './IndexSections/Tabs';
import classnames from 'classnames';

import {
  Card,
  CardBody,
  Container,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
  CardHeader,
} from 'reactstrap';

function Login() {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
    userType: 2,
  });

  const { mail, password, userType } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClick = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      userType: index,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      mail,
      password,
      userType,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Container className="vh-100">
        <Row className="mh-100">
          <Col className="d-flex align-items-center">
            <img
              src={require('../assets/img/loginIllustration.png')}
              alt="Login Illustration"
            />
          </Col>
          <Col>
            <h4 className="font-weight-bolder">Login to your account</h4>
            <section>{/* <Tabs /> */}</section>

            <Row className="justify-content-center">
              <Col>
                <div className="nav-wrapper">
                  <Nav
                    className="nav-fill flex-column flex-md-row"
                    id="tabs-icons-text"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        aria-selected={userType === 2}
                        className={classnames('mb-sm-3 mb-md-0', {
                          active: userType === 2,
                        })}
                        onClick={() => onClick(2)}
                        href="#pablo"
                        role="tab"
                      >
                        <i className="ni ni-cloud-upload-96 mr-2" />
                        Member{userType}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        aria-selected={userType === 1}
                        className={classnames('mb-sm-3 mb-md-0', {
                          active: userType === 1,
                        })}
                        onClick={() => onClick(1)}
                        href="#pablo"
                        role="tab"
                      >
                        <i className="ni ni-bell-55 mr-2" />
                        Fixie
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
                <Card className="shadow">
                  <CardBody>
                    <TabContent activeTab={'iconTabs' + userType}>
                      <TabPane tabId="iconTabs2">
                        <form onSubmit={onSubmit}>
                          <div className="form-group">
                            <input type="hidden" name="userType" value="2" />
                            <input
                              type="email"
                              className="form-control"
                              id="mail"
                              name="mail"
                              value={mail}
                              placeholder="abc@gmail.com"
                              onChange={onChange}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              value={password}
                              placeholder="********"
                              onChange={onChange}
                            />
                          </div>
                          <div className="form-group">
                            <button type="submit" className="btn btn-block">
                              Login as a Member
                            </button>
                          </div>
                        </form>
                      </TabPane>
                      <TabPane tabId="iconTabs1">
                        <form onSubmit={onSubmit}>
                          <div className="form-group">
                            <input type="hidden" name="usertype" value="1" />
                            <input
                              type="email"
                              className="form-control"
                              id="mail"
                              name="mail"
                              value={mail}
                              placeholder="abc@gmail.com"
                              onChange={onChange}
                            />
                          </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control"
                              id="password"
                              name="password"
                              value={password}
                              placeholder="********"
                              onChange={onChange}
                            />
                          </div>
                          <div className="form-group">
                            <button type="submit" className="btn btn-block">
                              Login as Fixie
                            </button>
                          </div>
                        </form>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
