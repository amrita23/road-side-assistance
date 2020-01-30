import React, { useState } from "react";
import "./SideNav.scss";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const SideNav = () => {
    const [isExpand, setEaxpand] = useState(false);
    return (
        <div className={isExpand ? "sidebar-menu expand" : "sidebar-menu"}>
            <div className="sideBarToggle">
                <i className={isExpand ? "fa fa-angle-left" : "fa fa-angle-right"} onClick={() => setEaxpand(!isExpand)}></i>
            </div>
            <Nav defaultActiveKey="/new-purchase-orders" className="flex-column">
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
    )
}
export default SideNav;
