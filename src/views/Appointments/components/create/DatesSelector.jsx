import React, { Component } from 'react'
import './DatesSelector.css'

// components
import MonthCalendar from './../calendar/MonthCalendar'
import SelectedDate from './SelectedDate'

class DatesSelector extends Component {
  state = {
    updateAll: false
  }
  handleDayClick (dates) {
    this.props.onDatesChange(dates)
  }

  handleUpdateAll (event) {
    const { checked: updateAll } = event.target
    this.setState({ updateAll })
  }

  handleUpdateDate (currentDate) {
    return newDate => {
      let { dates } = this.props
      const { updateAll } = this.state

      const index = dates.findIndex(d => d === currentDate)

      if (index <0 ) return

      if (updateAll) {
        dates = dates.map(date => {
          date.set({ hour: newDate.hour(), minute: newDate.minutes() })
          return date
        })

      } else {
        dates[index] = newDate
      }

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
          <div className="options">
              <div className="squaredFour">
                <input
                  type="checkbox"
                  value="None"
                  id="squaredFour"
                  name="check"
                  checked={this.state.updateAll}
                  onChange={this.handleUpdateAll.bind(this)} />
                <label htmlFor="squaredFour"></label>
              </div>

              <div className="label">Alterar todas as horas ao mesmo tempo</div>
          </div>

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
