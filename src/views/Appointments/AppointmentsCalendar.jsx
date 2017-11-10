import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import moment from 'moment'
import debounce from 'lodash/debounce'

import './AppointmentsCalendar.css'

import API from './../../helpers/APIClient'

// components
import Calendar from './components/calendar/Calendar'
import Button from './../../components/Button/Button'
import CreateAppointment from './components/create/CreateAppointment'

class Appointments extends Component {
  state = {
    isLoading: false,
    currentDate: moment(),
    appointments: []
  }

  componentWillMount () {
    this.startFetch()
  }

  componentWillReceiveProps () {
    this.startFetch()
  }

  handleStatusChange (id, status) {
    this.updateStatus(id, { status })
  }

  handleDateChange (currentDate) {
    this.setState({ currentDate, isLoading: true })
    this.fetchAppointments(currentDate)
  }

  async updateStatus(id, payload) {
    await API.updateAppointment(id, payload)
    this.startFetch()
  }

  startFetch () {
    const { currentDate } = this.state
    this.setState({ isLoading: true })
    this.fetchAppointments(currentDate)
  }

  fetchAppointments = debounce(async function (date) {
    const start = moment(
      date.weekday(0).format()
    ).set({ hour: 0, minute: 0, second: 0 })

    const end = moment(
      date.weekday(6).format()
    ).set({ hour: 0, minute: 0, second: 0 })

    try {
      const result = await API.fetchAppointments(start.format('YYYY-MM-DD'), end.format('YYYY-MM-DD'))

      this.setState({ appointments: result.data, isLoading: false })
    } catch (error) {
      console.warn('error?!', error)
    }
  }, 250)

  render () {
    const { currentDate, appointments, isLoading } = this.state

    return (
      <div className="appointments">
        <Route
          path="/appointments/add"
          exact
          component={CreateAppointment} />

        <div className="appointments-header">
          <div className="row">
            <div className="col-xs-12 col-md-offset-9 col-md-3">
              <Button
                to="/appointments/add"
                size="large"
                color="primary"
                icon="plus"
              >Adicionar</Button>
            </div>
          </div>
        </div>

        <Calendar
            isLoading={isLoading}
            date={currentDate}
            onDateChange={this.handleDateChange.bind(this)}
            onStatusChange={this.handleStatusChange.bind(this)}
            appointments={appointments}
          />
      </div>
    )
  }
}

export default Appointments
