
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './WeekAppointment.css'

import { hexToRgb } from './../../../../helpers/colors'

import WeekAppointmentMenu from './WeekAppointmentMenu'

class WeekAppointment extends Component {
  state = {
    active: false
  }

  render () {
    const {
      id,
      to,
      price,
      datetime,
      label,
      isDanger,
      isSuccess,
      color,
      onPaidClick,
      onNotPaidClick
    } = this.props

    const { active } = this.state

    const statusIcon = isDanger
      ? (
        <span className="danger">
          <i className="fa fa-exclamation"></i>
        </span>
        )
      : isSuccess
        ? (
          <span className="success">
            <i className="fa fa-check"></i>
          </span>
          )
        : null

    const notPaidOpacity = isDanger ? .2 : 1;
    const paidOpacity = isSuccess ? .2 : 1;

    const backgroundColor = hexToRgb(color, '.1')
    // const color = hexToRgb(color)

    return (
      <div className={`week-appointment-container ${active?'active':''}`}>

        <Link to={`/appointments/cancel/${id}`} className="cancel-menu">
          <i className="fa fa-trash-o"></i> cancelar marcação
        </Link>
        <div
          onClick={e => { this.setState({ active: !active }) }}
          className="week-appointment"
          style={{backgroundColor, color, borderLeftColor: color}}>
          <div className="header">
            <div className="labels">
              <span className="hour">
                <i className="fa fa-clock-o"></i>
                {datetime}
              </span>

              <span className="price">
                <i className="fa fa-eur"></i>
                {price.toFixed(2)}
              </span>
            </div>

            {statusIcon}
          </div>
          <span className="label">{label}</span>
        </div>

        <WeekAppointmentMenu
          id={id}
          paidOpacity={paidOpacity}
          onPaidClick={onPaidClick}
          notPaidOpacity={notPaidOpacity}
          onNotPaidClick={onNotPaidClick}
          to={to} />
      </div>
    )
  }
}

export default WeekAppointment
