import React from 'react';
import classnames from 'classnames';

// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Row,
  Col,
} from 'reactstrap';

class TabsSection extends React.Component {
  state = {
    iconTabs: 1,
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index,
    });
  };
  render() {
    return (
      <>
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
                    aria-selected={this.state.iconTabs === 1}
                    className={classnames('mb-sm-3 mb-md-0', {
                      active: this.state.iconTabs === 1,
                    })}
                    onClick={(e) => this.toggleNavs(e, 'iconTabs', 1)}
                    href="#pablo"
                    role="tab"
                  >
                    <i className="ni ni-cloud-upload-96 mr-2" />
                    Member
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    aria-selected={this.state.iconTabs === 2}
                    className={classnames('mb-sm-3 mb-md-0', {
                      active: this.state.iconTabs === 2,
                    })}
                    onClick={(e) => this.toggleNavs(e, 'iconTabs', 2)}
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
                <TabContent activeTab={'iconTabs' + this.state.iconTabs}>
                  <TabPane tabId="iconTabs1">
                    {/* <form onSubmit={onSubmit}>
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
                    </form> */}
                  </TabPane>
                  <TabPane tabId="iconTabs2">
                    <p className="description">
                      Cosby sweater eu banh mi, qui irure terry richardson ex
                      squid. Aliquip placeat salvia cillum iphone. Seitan
                      aliquip quis cardigan american apparel, butcher voluptate
                      nisi qui.
                    </p>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}

export default TabsSection;
