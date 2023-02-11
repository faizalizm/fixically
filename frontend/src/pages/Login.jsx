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
} from 'reactstrap';

function Login() {
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
    tab: 1,
  });

  const { mail, password, tab } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { member, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || member) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [member, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onClick = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      tab: index,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const memberData = {
      mail,
      password,
    };

    dispatch(login(memberData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Container className="vh-100">
        <Row>
          <Col>
            <Card></Card>
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
                        aria-selected={tab === 1}
                        className={classnames('mb-sm-3 mb-md-0', {
                          active: tab === 1,
                        })}
                        onClick={() => onClick(1)}
                        href="#pablo"
                        role="tab"
                      >
                        <i className="ni ni-cloud-upload-96 mr-2" />
                        Member{tab}
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        aria-selected={tab === 2}
                        className={classnames('mb-sm-3 mb-md-0', {
                          active: tab === 2,
                        })}
                        onClick={() => onClick(2)}
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
                    <TabContent activeTab={'iconTabs' + tab}>
                      <TabPane tabId="iconTabs1">
                        <form onSubmit={onSubmit}>
                          <div className="form-group">
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
                              Register
                            </button>
                          </div>
                        </form>
                      </TabPane>
                      <TabPane tabId="iconTabs2">
                        <p className="description">
                          Cosby sweater eu banh mi, qui irure terry richardson
                          ex squid. Aliquip placeat salvia cillum iphone. Seitan
                          aliquip quis cardigan american apparel, butcher
                          voluptate nisi qui.
                        </p>
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
