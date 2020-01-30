import React, { useState, useContext, useEffect } from "react";
import "./Header.scss";
import { Container, Row, Col, Nav, NavDropdown } from "react-bootstrap";
import logo from "../../assets/img/logo.png";
import { NavLink, Link, useHistory } from "react-router-dom";
import AuthContext from "../../Context/auth/authContext";

const Header = () => {
  //For Route
  const history = useHistory();
  const [showNav, setNav] = useState(false);
  const authContext = useContext(AuthContext);
  const { keepLoggedIn, logout, isAuthenticated } = authContext;
  const logOut = () => {
    logout();
    history.push("/");
  }
  useEffect(() => {
    if(keepLoggedIn === false || isAuthenticated === false){
      logout();
    }
  },[])
  return (
    <div className="header-menu">
      <Container fluid={true} className="mt-3 ml-2">
        <Row>
          <Col xs={9}>
            <figure className="logo">
              <img src={logo} alt="logo" className="img-fluid" />
              <figcaption>Roadside Assistance</figcaption>
            </figure>
          </Col>
          <Col xs={3}>
            <div className="header-right-bars mt-1">
              <i
                className={showNav === true ? "fa fa-times" : "fa fa-bars"}
                aria-hidden="true"
                onClick={() => setNav(!showNav)}
              ></i>
              <div className={showNav === true ? "down-nav show" : "down-nav"}>
                <div className="right-wrapper">
                  <Nav>
                    <Nav.Item>
                      <Nav.Link href="#">
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                      </Nav.Link>
                    </Nav.Item>
                    <NavDropdown title="Account" id="nav-dropdown">
                      <NavDropdown.Item eventKey="4.1" as={Link} to="/edit-account">
                        Edit Account
                   </NavDropdown.Item>
                      <NavDropdown.Item eventKey="4.2" onClick={logOut}>Logout</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </div>
                <div>
                  <Nav
                    className="flex-column sidemenu"
                    defaultActiveKey="/new-purchase-orders"
                  >
                    <NavLink activeClassName="active" to="/all-purchase-orders">
                      <i className="fa fa-file-text-o" aria-hidden="true" />
                      <span>All Purchase Orders</span>
                    </NavLink>
                    <NavLink activeClassName="active" to="/new-purchase-orders">
                      <i className="fa fa-plus-square-o" aria-hidden="true" />
                      <span>New Purchase Order</span>
                    </NavLink>
                    <NavLink activeClassName="active" to="/refund-request" target="_blank">
                      <i className="fa fa-scissors" aria-hidden="true" />
                      <span>Refund Request</span>
                    </NavLink>
                    <NavLink activeClassName="active" to="/user-list">
                      <i className="fa fa-user" aria-hidden="true" />
                      <span>Users</span>
                    </NavLink>
                  </Nav>
                </div>

              </div>
            </div>
            <div className="header-right-nav">
              <Nav className="justify-content-end">
                <Nav.Item>
                  <Nav.Link href="#">
                    <i className="fa fa-refresh" aria-hidden="true"></i>
                  </Nav.Link>
                </Nav.Item>
                <NavDropdown title="Account" id="nav-dropdown">
                  <NavDropdown.Item eventKey="4.1" as={Link} to="/edit-account">
                    Edit Account
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2" onClick={logOut}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
