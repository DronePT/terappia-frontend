import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './CreateAppointment.css'

// helpers
import API from './../../../../helpers/APIClient'

// components
import Modal from './../../../../components/Modal/Modal'
import Button from './../../../../components/Button/Button'

import PatientsSelector from './PatientsSelector'
import DatesSelector from './DatesSelector'
import AppointmentDetails from './AppointmentDetails'

const Step = ({ step, icon, children, active, done }) => {
  const classname = ['step-container']

  if (active) classname.push('is-active')
  if (done) classname.push('is-done')

  return (
    <div className={classname.join(' ')}>
      <div className="step-label">{children}</div>
      <div className="step-icon">{done ? (<i className="fa fa-check"></i>) : step}</div>
      <div className="step-line"></div>
    </div>
  )
}

class CreateAppointment extends Component {
  state = {
    isLoading: false,
    isCreated: false,
    name: '',
    patients: [],
    currentStep: 1,
    form: {
      patient: null,
      dates: [],
      details: {
        type: 'intervention',
        status: 'notdone',
        price: 25,
        description: ''
      }
    }
  }

  componentWillMount () {
    this.fetchPatients()
  }

  handleClose () {
    this.setState({ isCreated: true })
  }

  handlePrevClick () {
    const { currentStep } = this.state
    this.updateStep(currentStep-1)
  }

  handleNextClick () {
    const { currentStep } = this.state
    this.updateStep(currentStep+1)
  }

  handleFinishClick () {
    const { details, patient, dates } = this.state.form

    const payload = {
      ...details,
      patient: patient._id,
      dates: dates.map(date => date.format('YYYY-MM-DD HH:mm'))
    }

    this.createAppointment(payload)
  }

  updateStep (currentStep) {
    this.setState({ currentStep })
  }

  triggerCreated () {
    this.setState({ isCreated: true })
  }

  async createAppointment (payload) {
    this.setState({ isLoading: true })

    try {
      await API.createAppointment(payload)
      this.triggerCreated()
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  async fetchPatients () {
    try {
        const result = await API.fetchPatients('', 1, true, 0)

        this.setState({ patients: result.data })
    } catch (error) {
      console.warn('error!', error)
    }
  }

  updateForm (field) {
    return value => {
      this.setState({ form: { ...this.state.form, [field]: value }})
    }
  }

  // computed vars
  get isNextAvailable () {
    const { currentStep, form } = this.state

    switch (currentStep) {
      case 1:
        // verify if a patient is selected
        return !!form.patient
      case 2:
        return form.dates.length > 0
      default:
        return false
    }
  }

  get isFinishAvailable () {
    const { currentStep } = this.state

    return currentStep === 3
  }

  renderCurrentStep () {
    const { form, patients, currentStep } = this.state

    switch (currentStep) {
      case 1:
        return (
          <PatientsSelector
            patients={patients}
            selected={form.patient}
            onSelect={this.updateForm('patient')}/>
        )
      case 2:
        return (
          <DatesSelector
            dates={form.dates}
            onDatesChange={this.updateForm('dates')}
            />
        )
      case 3:
      return (
        <AppointmentDetails
            data={form.details}
            onUpdate={this.updateForm('details')}
            />
        )
      default:
        return <div>404 - step not found!</div>
    }
  }

  render () {
    const { currentStep, isLoading, isCreated } = this.state

    if (isCreated) return <Redirect to="/appointments"/>

    return (
      <Modal
        title="Adicionar marcação"
        loading={isLoading}
        onClose={this.handleClose.bind(this)}>
        <div className="stepper">

          <Step step="1" done={currentStep>1} active={currentStep===1} icon="user">Utente</Step>
          <Step step="2" done={currentStep>2} active={currentStep===2} icon="calendar">Datas</Step>
          <Step step="3" done={currentStep>3} active={currentStep===3} icon="info">Detalhes</Step>

        </div>

        <div className="step-content">
          {this.renderCurrentStep()}
        </div>

        <div className="create-appointment--footer">
          <div>
            {currentStep <= 1 ? null : <Button
              onClick={this.handlePrevClick.bind(this)}
              icon="chevron-left"
              color="primary">Anterior</Button>}
          </div>

          <div>
            {!this.isNextAvailable ? null : <Button
              onClick={this.handleNextClick.bind(this)}
              icon="chevron-right"
              color="primary">Seguinte</Button>}

            {!this.isFinishAvailable ? null : <Button
              onClick={this.handleFinishClick.bind(this)}
              icon="check"
              color="green">Adicionar</Button>}
          </div>
        </div>
      </Modal>
    )
  }
}

export default CreateAppointment
