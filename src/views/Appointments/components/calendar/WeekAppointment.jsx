
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './WeekAppointment.css'

import { hexToRgb } from './../../../../helpers/colors'


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
      </div>
    )
  }
}

export default WeekAppointment
