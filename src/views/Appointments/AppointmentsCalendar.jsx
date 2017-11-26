import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import moment from 'moment'
import debounce from 'lodash/debounce'

import './AppointmentsCalendar.css'

import API from './../../helpers/APIClient'

// components
import WeekCalendar from './components/calendar/week/Calendar'
import DayCalendar from './components/calendar/day/Calendar'

import Button from './../../components/Button/Button'
import CreateAppointment from './components/create/CreateAppointment'
import CancelAppointment from './components/cancel/CancelAppointment'

class Appointments extends Component {
  state = {
    isLoading: false,
    currentDate: moment(),
    mode: 'day',
    appointments: []
  }

  componentWillMount () {
    this.fetchFromStateDate()
  }

  componentWillReceiveProps () {
    this.fetchFromStateDate()
  }

  handleStatusChange (id, status) {
    this.updateStatus(id, { status })
  }

  handleDateChange (date) {
    this.fetchAppointments(date, this.state.mode)
  }

  handleModeChange (event) {
    const { value: mode } = event.target

    this.setState({ mode }, this.fetchFromStateDate)
  }

  async updateStatus(id, payload) {
    await API.updateAppointment(id, payload)
    this.fetchFromStateDate()
  }

  fetchFromStateDate () {
    const { currentDate, mode } = this.state

    this.setState(
      { isLoading: true },
      () => this.fetchAppointments(currentDate, mode)
    )

  }

  __getStartAndEndDate (date, mode) {
    let start, end

    if (mode === 'week') {
      start = moment(date.weekday(0).format())
      end = moment(date.weekday(6).format())
    } else if (mode === 'day') {
      start = moment(date).set({ hour: 0, minute: 0, second: 0 })
      end = moment(date).set({ hour: 23, minute: 59, second: 59 })
    }

    return { start, end }
  }

  /**
   * {moment} date
   */
  fetchAppointments = debounce(async function (date, mode) {
    const { start, end } = this.__getStartAndEndDate(date, mode)

    try {
      const result = await API.fetchAppointments(
        start.format('YYYY-MM-DD'),
        end.format('YYYY-MM-DD')
      )

      this.setState({
        appointments: result.data,
        isLoading: false,
        currentDate: moment(date.format())
      })
    } catch (error) {
      console.warn('error?!', error)
    }
  }, 250)

  render () {
    const { currentDate, appointments, isLoading, mode } = this.state

    return (
      <div className="appointments">
        <Route
          path="/appointments/add"
          exact
          component={CreateAppointment} />

        <Route
          path="/appointments/cancel/:appointment"
          exact
          component={CancelAppointment} />

        <div className="appointments-header">
          <div className="row">
            <div className="col-xs-12  col-md-9">
              <label htmlFor="mode-week">
                <input
                  type="radio" name="mode" id="mode-week" value="week"
                  onChange={this.handleModeChange.bind(this)}
                  checked={mode === 'week'} />
                semanal
              </label>

              <label htmlFor="mode-day">
                <input type="radio" name="mode" id="mode-day" value="day"
                onChange={this.handleModeChange.bind(this)}
                checked={mode === 'day'} />
                diário
              </label>
            </div>

            <div className="col-xs-12  col-md-3">
              <Button
                to="/appointments/add"
                size="large"
                color="primary"
                icon="plus"
              >Adicionar</Button>
            </div>
          </div>
        </div>

        {
          mode === 'week'
          ? <WeekCalendar
              isLoading={isLoading}
              date={currentDate}
              onDateChange={this.handleDateChange.bind(this)}
              onStatusChange={this.handleStatusChange.bind(this)}
              appointments={appointments}
            />
          : <DayCalendar
              isLoading={isLoading}
              date={currentDate}
              onDateChange={this.handleDateChange.bind(this)}
              onStatusChange={this.handleStatusChange.bind(this)}
              appointments={appointments} />
        }
      </div>
    )
  }
}

export default Appointments
