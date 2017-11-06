import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/pt'

import './MonthCalendar.css'

// components
import MonthDay from './MonthDay'

class MonthCalendar extends Component {
  constructor () {
    super()

    this.handleDayClick = this.handleDayClick.bind(this)
  }

  state = {
    selectedDate: moment()
  }

  handleDayClick (date) {
    return event => {
      event.preventDefault()
      let { dates = [], onDayClick } = this.props

      dates = this.testSelected(date)
        ? dates.filter(d => d.format('DD-MM-YYYY') !== date.format('DD-MM-YYYY'))
        : [ ...dates, date  ]

      if (onDayClick) onDayClick(dates)
    }
  }

  testSelected (date) {
    const { dates } = this.props

    if (!dates) return false

    return !!dates.find(d => d.format('DD-MM-YYYY') === date.format('DD-MM-YYYY'))
  }

  updateMonth (add) {
    return event => {
      const { selectedDate } = this.state

      event.preventDefault()
      this.setState({ selectedDate: selectedDate.add(add, 'month') })
    }
  }

  get monthDays () {
    const { selectedDate } = this.state

    // set initial date as first day of the month
    const date = selectedDate.date(1)

      const monthDays = []
    let weekDays = []
    let currentWeek = date.week()

    // set calendar start beginning on the first day of the week
    const start = 1 - date.weekday()

    // send calendar end to the last day of the week
    const end = date.endOf('month').date() + (6 - date.endOf('month').weekday())

    for (let day = start; day <= end; day++) {
      const nextDay = moment(date.format())
        .date(day)
        .set({ hour: 10, minutes: 0, seconds: 0 })

      // check if next day to add is from another week, if so
      // finish the week and push it to month's array
      // and reset the next week array
      if (nextDay.week() !== currentWeek) {
        monthDays.push(weekDays)
        currentWeek = nextDay.week()
        weekDays = []
      }

      // add the next day to the current week
      weekDays.push(nextDay)
    }

    // add remaining week to month array
    monthDays.push(weekDays)

    return monthDays
  }

  render () {
    const { selectedDate } = this.state

    return (
      <div className="month-calendar">
        <div className="month-name">
          <a
            onClick={this.updateMonth(-1)}
            href="#prev"
            className="arrows">
            <i className="fa fa-chevron-left"></i>
          </a>

          <span className="label">
            {selectedDate.format('MMMM Y')}
          </span>

          <a
            onClick={this.updateMonth(1)}
            href="#next"
            className="arrows">
            <i className="fa fa-chevron-right"></i>
          </a>
        </div>

        <div className="header">
          <div>Seg</div>
          <div>Ter</div>
          <div>Qua</div>
          <div>Qui</div>
          <div>Sex</div>
          <div>Sáb</div>
          <div>Dom</div>
        </div>

        <div className="body">
          {this.monthDays.map((week, wk) => (
            <div key={wk} className="week">
              {week.map((day, dk) => (
                <MonthDay
                  key={dk}
                  day={day}
                  onClick={this.handleDayClick(day)}
                  selected={this.testSelected(day)} />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default MonthCalendar
