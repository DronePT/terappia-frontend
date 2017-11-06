import React from 'react'
import moment from 'moment'
import './SelectedDate.css'

const preventDefault = e => e.preventDefault()

const updateHour = (action, date, onUpdate = _=>_) => event => {
  event.preventDefault()

  const newDate = moment(date.format())
  newDate.hour(newDate.hour() + action)

  onUpdate(newDate)
}

const updateMinutes = (action, date, onUpdate = _=>_) => event => {
  event.preventDefault()

  const newDate = moment(date.format())
  newDate.minutes(newDate.minutes() + action)

  onUpdate(newDate)
}

const SelectedDate = ({ date, onUpdate }) => {
  return (
    <div className="selected-date">
      <div className="date">
        <span className="label">{date.format('DD-MM-YYYY')}</span>
        <span className="value">{date.format('dddd')}</span>
      </div>

      <div className="time">
        <span className="time-stepper">
          <div className="ts-controls">
              <a
                href="#ts-up"
                onClick={updateHour(1, date, onUpdate)}
                onDragStart={preventDefault}>
                  <i className="fa fa-chevron-up"></i></a>
              <a
                href="#ts-down"
                onClick={updateHour(-1, date, onUpdate)}
                onDragStart={preventDefault}>
                  <i className="fa fa-chevron-down"></i></a>
          </div>
          {date.format('HH')}
        </span>

        <span>:</span>

        <span className="time-stepper">
          <div className="ts-controls">
              <a
                href="#ts-up"
                onClick={updateMinutes(5, date, onUpdate)}
                onDragStart={preventDefault}>
                  <i className="fa fa-chevron-up"></i></a>
              <a
                href="#ts-down"
                onClick={updateMinutes(-5, date, onUpdate)}
                onDragStart={preventDefault}>
                  <i className="fa fa-chevron-down"></i></a>
          </div>
          {date.format('mm')}
        </span>
      </div>
    </div>
  )
}

export default SelectedDate
