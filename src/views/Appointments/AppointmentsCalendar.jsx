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

  handleModeChange (mode) {
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
          <div className="row middle-xs">
            <div className="col-xs-12 col-md-4 margin-xs">
              <div className="row">
                <div className="col-xs-6">
                  <Button
                    style={{width: '100%'}}
                    onClick={e => this.handleModeChange('day') }
                    size="large"
                    color={mode === 'day' ? 'green' : 'primary'}
                    icon={mode === 'day' ? 'check-circle-o' : 'circle-o'}
                  >Diário</Button>
                </div>
                <div className="col-xs-6">
                  <Button
                    style={{width: '100%'}}
                    onClick={e => this.handleModeChange('week') }
                    size="large"
                    color={mode === 'week' ? 'green' : 'primary'}
                    icon={mode === 'week' ? 'check-circle-o' : 'circle-o'}
                  >Semanal</Button>
                </div>
              </div>
            </div>

            <div className="col-xs-12 col-md-offset-5 col-md-3">
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
