import React from 'react'
import { Link } from 'react-router-dom'

const WeekAppointmentMenu = (props) => {
  const {
    id,
    paidOpacity,
    onPaidClick,
    notPaidOpacity,
    onNotPaidClick,
    to
  } = props
  return (
    <div className="menu">
      <div className="left">
        <Link
            onDragStart={e => e.preventDefault()}
            to={to}>
            <i className="fa fa-search"></i>
          </Link>
      </div>
      <div className="right">
        <div className="money">
          <span className="label">
            <i className="fa fa-money"></i>
          </span>

          <a
            href="#paid"
            onClick={e => { e.preventDefault(); onPaidClick(id) }}
            style={{color: '#28c96d', opacity: paidOpacity }}>
            <i className="fa fa-check"></i>
          </a>
          <span className="separator"></span>
          <a
            href="#notpiad"
            onClick={e => { e.preventDefault(); onNotPaidClick(id) }}
            style={{color: '#f9334b', opacity: notPaidOpacity }}>
            <i className="fa fa-times"></i>
          </a>
        </div>
      </div>
    </div>
  )
}

export default WeekAppointmentMenu
