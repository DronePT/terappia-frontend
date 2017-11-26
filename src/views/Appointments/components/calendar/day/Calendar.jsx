import React from 'react'
import moment from 'moment'
import 'moment/locale/pt'

import './Calendar.css'

// components
import WeekDay from './../week/WeekDay'
import WeekAppointment from './../week/WeekAppointment'

class Calendar extends React.Component {
  constructor () {
    super()

    this.handleChangeWeekClick = this.handleChangeWeekClick.bind(this)
  }

  handleStatusChange (type) {
    return id => {
      this.props.onStatusChange(id, type)
    }
  }

  handleChangeWeekClick (add) {
    const { onDateChange } = this.props

    return event => {
      event.preventDefault()

      const { date } = this.props

      const newDate = moment(date.format())

      newDate.add(add, 'day')

      onDateChange(newDate)
    }
  }

  renderWeekdays () {
    const { appointments, date: wd } = this.props

    const dayAppointments = appointments.filter(({ date }) => moment(date).weekday() === wd.weekday())

    return (
      <WeekDay showHeader={false} day={wd} appointments={dayAppointments}>
        {dayAppointments.map((a, i) => (
          <WeekAppointment
            id={a._id}
            to={`/appointments/${a._id}`}
            key={i}
            price={a.price}
            datetime={moment(a.date).format('HH:mm')}
            isSuccess={a.status === 'paid'}
            isDanger={a.status === 'notpaid'}
            color={a.patient.company.color}
            label={(a.patient || { name: 'N/D' }).name}
            onPaidClick={this.handleStatusChange('paid')}
            onNotPaidClick={this.handleStatusChange('notpaid')} />
        ))}
      </WeekDay>
    )
  }

  render () {
    const { isLoading, date } = this.props

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
          {date.format('dddd DD/MM')}
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
          onClick={this.handleChangeWeekClick(1)}
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
