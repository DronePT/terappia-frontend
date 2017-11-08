import React, { Component } from 'react'
import debounce from 'lodash/debounce'
import moment from 'moment'
import 'moment/locale/pt'

import './Appointment.css'

// components
import AppointmentDetails from './components/create/AppointmentDetails'

import API from './../../helpers/APIClient'

class Appointment extends Component {
  state = {
    isLoading: true,
    appointment: null
  }

  componentWillMount () {
    this.fetch()
  }

  handleUpdateDetails (appointment) {
    this.updateAppointment(appointment)
  }

  updateAppointment (appointment) {

    const { type, status, price, description, summary } = appointment

    this.updateAPI({ type, price, status, description, summary })

    this.setState({appointment})
  }

  handleSummary = debounce(function(summary) {
    this.updateAppointment({ ...this.state.appointment, summary })
  }, 500)

  updateAPI = debounce(function(appointment) {
    const { appointment: id } = this.props.match.params

    API.updateAppointment(id, appointment)
  }, 500)

  async fetch () {
    try {
      const { appointment: id } = this.props.match.params

      const { data: appointment } = await API.fetchAppointment(id)

      this.setState({ appointment, isLoading: false })
    } catch (error) {
      console.log('error')
    }
  }

  render () {
    if (this.state.isLoading) return 'Loading...'

    const {
      patient,
      date: rawDate,
      summary } = this.state.appointment

    const date = `${moment(rawDate).format('DD-MM-YYYY HH:mm')} (${moment(rawDate).from()})`

    const backgroundImage = patient.avatar || undefined

    return (
      <div className="appointment">
        <div className="appointment-header">
          <div className="avatar-container">
            <div
              className="avatar"
              style={{backgroundImage}}></div>
          </div>

          <div className="detail-container">
            <div className="name">{patient.name}</div>
            <div className="company"><span>Pertence à:</span> {patient.company.name}</div>
          </div>
        </div>

        <div className="appointment-body">
          <h3 className="title">Consulta: {date}</h3>

          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <div className="card">
                <div className="card-header">Sumário da consulta</div>
                <div className="card-body">
                  <textarea
                    onChange={event => this.handleSummary(event.target.value) }
                    name="summary"
                    id="summary"
                    placeholder="Escreva aqui o sumário da consulta..."
                    rows="15">{summary}</textarea>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-sm-6">

              <div className="card">
                <div className="card-header">Detalhes</div>
                <div className="card-body">
                  <AppointmentDetails
                    data={this.state.appointment}
                    onUpdate={this.handleUpdateDetails.bind(this)}/>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointment
