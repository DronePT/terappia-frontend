import React from 'react'
import { Link } from 'react-router-dom'

import './WeekAppointment.css'

import { hexToRgb } from './../../../../helpers/colors'

const WeekAppointment = ({ to, datetime, label, isDanger, color }) => {
  const backgroundColor = hexToRgb(color, '.1')
  // const color = hexToRgb(color)

  return (
    <div className="week-appointment-container">
      <Link
        to={to}
        className="week-appointment"
        style={{backgroundColor, color, borderLeftColor: color}}>
        <div className="header">
          <span className="hour">
            <i className="fa fa-clock-o"></i>
            {datetime}
          </span>

          {isDanger?(
            <span className="danger">
              <i className="fa fa-exclamation"></i>
            </span>
          ):null}
        </div>
        <span className="label">{label}</span>
      </Link>
    </div>
  )
}

export default WeekAppointment
