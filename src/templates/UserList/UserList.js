import React, { Fragment } from "react";
import Header from "../../shareComponents/Header/Header";
import SideNav from "../../shareComponents/SideNav/SideNav";
import { Container, Col, Row, Table } from "react-bootstrap";
import "./UserList.scss";
import { Link } from "react-router-dom";

const UserList = () => {
    return (
        <Fragment>
            <div className="user-list">
                <Row>
                    <Col md={9}>
                        <div className="search-area">
                            <input type="text" className="form-control" placeholder="Search" />
                            <button type="button" className="btn btn-danger searchBtn"><i className="fa fa-search"></i></button>
                            <button type="button" className="btn btn-primary mobile-width">Reset Search</button>
                        </div>

                    </Col>
                    <Col md={3} className="text-right mt-2 export-area">
                        <Link to="" className="text-danger mt-2">Export</Link>
                        <i className="fa fa-share text-danger ml-1" aria-hidden="true"></i>
                        <button type="button" className="btn btn-primary float-right">Create New User</button>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col md={12}>
                        <div className="table-responsive">
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="pretty p-icon p-curve">
                                                <input type="checkbox" />
                                                <div className="state p-danger">
                                                    <i className="icon material-icons">done</i>
                                                    <label>First Name</label>
                                                </div>
                                            </div>
                                        </th>
                                        <th>Last Name</th>
                                        <th>Email Type</th>
                                        <th>Phone Number</th>
                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="pretty p-icon p-curve">
                                                <input type="checkbox" />
                                                <div className="state p-danger">
                                                    <i className="icon material-icons">done</i>
                                                    <label></label>
                                                </div>
                                            </div>
                                            Swagata
                                    </td>
                                        <td>fdg</td>
                                        <td>a@gmail.shareComponents</td>
                                        <td>9486984956</td>
                                        <td> <button type="button" className="btn btn-success">Block</button>
                                            &nbsp;&nbsp;<i className="fa fa-pencil fa-lg text-muted"></i>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                        </div>
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default UserList;