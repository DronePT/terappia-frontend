import React from 'react'
import moment from 'moment'
import 'moment/locale/pt'

import './WeekDay.css'

const WeekDay = ({ day = moment(), children }) => {
  if (typeof day === 'string') day = moment(day)

  const diff = moment().diff(day, 'days', true)

  const isToday = diff > 0 && diff < 1
  const classname = `calendar-week-day ${isToday?'is-today':''}`

  return (
    <div className={classname}>
      <div className="calendar-week-day-header">
        <div className="calendar-header-col">
          <span className="day-name">{day.format('dddd')}</span>
          <span className="date">{day.format('DD MMM')}</span>
        </div>
      </div>

      <div className="calendar-week-day-body">
        {children}
      </div>
    </div>
  )
}

export default WeekDay
