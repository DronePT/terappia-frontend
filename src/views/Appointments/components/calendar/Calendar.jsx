import React from 'react'
import moment from 'moment'
import 'moment/locale/pt'

import './Calendar.css'

// components
import WeekDay from './WeekDay'
import WeekAppointment from './WeekAppointment'

class Calendar extends React.Component {
  constructor () {
    super()

    this.handleChangeWeekClick = this.handleChangeWeekClick.bind(this)
  }

  state = {
    date: moment()
  }

  componentWillMount () {
    this.setNewDate(this.props.date)
  }

  componentWillReceiveProps (nextProps) {
    this.setNewDate(nextProps.date)
  }

  setNewDate (date) {
    if (typeof date === 'string') date = moment(date)

    this.setState({ date })
  }

  handleChangeWeekClick (weekday) {
    const { onDateChange } = this.props
    const { date } = this.state

    return event => {
      event.preventDefault()
      onDateChange(date.weekday(weekday))
    }
  }

  renderWeekdays () {
    const { date } = this.state
    const { appointments } = this.props

    const weekdays = []

    for (let wd = 0; wd <= 6; wd++) {
      const wday = moment(date.weekday(wd).format())
      const dayAppointments = appointments.filter(({ date }) => moment(date).weekday() === wd)
      weekdays.push(
        <WeekDay key={wd} day={wday} appointments={dayAppointments}>
          {dayAppointments.map((a, i) => (
            <WeekAppointment
              key={i}
              datetime={moment(a.date).format('HH:mm')}
              isDanger={a.status === 'notpaid'}
              color={a.patient.company.color}
              label={(a.patient || { name: 'N/D' }).name} />
          ))}
        </WeekDay>
      )
    }

    return weekdays
  }

  render () {
    const { date } = this.state
    const { isLoading } = this.props

    return (
      <div className="calendar week-mode">
        <a
          onClick={this.handleChangeWeekClick(-1)}
          onDragStart={e => e.preventDefault()}
          href="#prev"
          className="change-week">
          <i className="fa fa-chevron-left"></i>
        </a>

        <div className="calendar-header">
          {date.format('MMMM YYYY')}
        </div>

        <div className="calendar-body">
          {isLoading?(
            <div className="calendar-body--loading">
              <div className="ball-clip-rotate-multiple"><div></div><div></div></div>
              <span>aguarde um momento...</span>
            </div>
          ):null}
          {this.renderWeekdays()}
        </div>

        <a
          onClick={this.handleChangeWeekClick(7)}
          onDragStart={e => e.preventDefault()}
          href="#next"
          className="change-week">
          <i className="fa fa-chevron-right"></i>
        </a>
      </div>
    )
  }
}

export default Calendar
