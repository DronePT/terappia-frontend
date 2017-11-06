import React, { Component } from 'react'
import './DatesSelector.css'

// components
import MonthCalendar from './../calendar/MonthCalendar'
import SelectedDate from './SelectedDate'

class DatesSelector extends Component {
  handleDayClick (dates) {
    this.props.onDatesChange(dates)
  }

  handleUpdateDate (currentDate) {
    return newDate => {
      const { dates } = this.props

      const index = dates.findIndex(d => d === currentDate)

      if (index > -1) dates[index] = newDate

      this.handleDayClick(dates)
    }
  }

  render () {
    const { dates } = this.props

    return (
      <div className="month-calendar-container">
        <MonthCalendar
          dates={dates}
          onDayClick={this.handleDayClick.bind(this)}
        />

        <div className="month-selected-dates">
          {this.props.dates.map((date, i) => (
            <SelectedDate
              key={i}
              date={date}
              onUpdate={this.handleUpdateDate(date)}
            />)
          )}
        </div>
      </div>
    )
  }
}

export default DatesSelector
