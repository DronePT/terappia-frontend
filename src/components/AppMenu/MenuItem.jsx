import React from 'react'
import { Route, Link } from 'react-router-dom'

const MenuItem = ({ to, icon, children, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}>
        <i className={`fa fa-${icon}`}></i>
        <span>{children}</span>
      </Link>
    </li>
  )}/>
)

export default MenuItem
