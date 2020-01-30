import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./templates/Login/Login";
import PurchaseOrder from "./templates/PurchaseOrder/PurchaseOrder";
import AllPurchaseOrder from "./templates/AllPurchaseOrder/AllPurchaseOrder";
import InvoiceOverview from "./templates/InvoiceOverView/InvoiceOverview";
import EditAccount from "./templates/EditAccount/EditAccount";
import UserList from "./templates/UserList/UserList";
import ForgotPassword from "./templates/ForgotPassword/ForgotPassword";
import Header from "./shareComponents/Header/Header";
import SideNav from "./shareComponents/SideNav/SideNav";
import PrivateRoute from "./route/PrivateRoute";
import { Container, Row, Col } from "react-bootstrap";

const Root = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact><Login /></Route>
                <Route path="/forgot-password"><ForgotPassword /></Route>
                <Fragment>
                    <Header />
                    <SideNav />
                    <div className="main-content-wraper">
                        <Container>
                            <Row>
                                <Col md={12}>
                                    <PrivateRoute path="/new-purchase-orders" exact><PurchaseOrder /></PrivateRoute>
                                    <PrivateRoute path="/all-purchase-orders"><AllPurchaseOrder /></PrivateRoute>
                                    <PrivateRoute path="/invoice-overview/:invoice_id"><InvoiceOverview /></PrivateRoute>
                                    <PrivateRoute path="/edit-account"><EditAccount /></PrivateRoute>
                                    <PrivateRoute path="/user-list"><UserList /></PrivateRoute>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Fragment>


            </Switch>
        </Router>
    );
}

export default Root;