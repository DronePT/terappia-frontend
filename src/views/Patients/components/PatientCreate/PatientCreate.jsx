import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import './PatientCreate.css'

// helpers
import API from './../../../../helpers/APIClient'

// components
import TextInput from './../../../../components/Form/TextInput'
import SelectInput from './../../../../components/Form/SelectInput'
import Button from './../../../../components/Button/Button'

class PatientCreate extends Component {
  constructor () {
    super()

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCreateClick = this.handleCreateClick.bind(this)
    this.create = this.create.bind(this)
    this.triggerCreated = this.triggerCreated.bind(this)
    this.bindKeyboard = this.bindKeyboard.bind(this)
  }


  state = {
    isLoading: false,
    isCreated: false,
    hasError: {
      name: false,
      company: false,
    },
    companies: [],
    patient: {
      name: '',
      phonenumber: '',
      street: '',
      vatId: '',
      avatar: '',
      company: ''
    }
  }

  // life cycles
  componentWillMount () {
    this.fetchCompanies()
  }

  componentDidMount () {
    window.addEventListener('keyup', this.bindKeyboard)
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.bindKeyboard)
  }

  // handlers

  handleInputChange (event) {
    const { name, value } = event.target

    console.log(name, value)

    this.setState({
      patient: { ...this.state.patient, [name]: value }
    })
  }

  handleCreateClick () {
    this.create(this.state.patient)
  }

  bindKeyboard (event) {
    const key = event.keyCode || event.which
    if (key === 27) this.setState({ isCreated: true })
  }

  /**
   * fetch companies from api
   */
  async fetchCompanies () {
    try {
      const result = await API.fetchCompanies()

      const companies = result.data.map(
        ({ _id: value, name: label }) => ({ value, label })
      )

      this.setState({ companies: [ { value: '', label: 'Seleccione' }, ...companies ] })
    } catch (error) {
      console.warn('error', error)
    }
  }

  /**
   * create a patient in api
   */
  async create (data) {
    if (!data.name) return this.setError('name')
    if (!data.company) return this.setError('company')

    this.setState({ isLoading: true })

    try {
      await API.createPatient(data)

      this.triggerCreated()
    } catch (error) {
      console.log('error creating patient', error)
      this.setState({ isLoading: false })
    }
  }

  setError (error) {
    this.setState({
      hasError: { ...this.state.hasError, [error]: true }
    })

    setTimeout(() => {
      this.setState({
        hasError: { ...this.state.hasError, [error]: false }
      })
    }, 3000)
  }

  triggerCreated () {
    this.setState({ isCreated: true })
  }

  render () {
    const {
      isLoading,
      isCreated,
      hasError,
      companies,
      patient
    } = this.state

    if (isCreated) return <Redirect to="/patients"/>

    return (
      <div className="patient-create">
        <div className="create-card">
          {isLoading ? (
            <div className="create-card--loading">
              <div className="ball-clip-rotate-multiple"><div></div><div></div></div>
              <span>aguarde um momento...</span>
            </div>
          ) : ( null
            // <Link to="/patients" className="create-card--close">
            //   <i className="fa fa-times"></i>
            //   <span>Fechar</span>
            // </Link>
          )}

          <div className="create-card--header">
            Criar um novo utente
          </div>

          <div className="create-card--body">

            <div className="row">
              <div className="col-xs-12 col-sm-6">
                <TextInput
                  hasError={hasError.name}
                  label="nome"
                  name="name"
                  onInput={this.handleInputChange}
                />
              </div>

              <div className="col-xs-12 col-sm-6">
                <SelectInput
                  name="company"
                  label="Pertence à"
                  hasError={hasError.company}
                  onChange={this.handleInputChange}
                  value={patient.company}
                  options={companies}
                  />
              </div>

              <div className="col-xs-12 col-sm-6">
                <TextInput
                    label="Contacto telefónico"
                    name="phonenumber"
                    onInput={this.handleInputChange}
                  />
              </div>

              <div className="col-xs-12 col-sm-6">
                <TextInput
                  label="Morada"
                  name="street"
                  onInput={this.handleInputChange}
                />
              </div>

              <div className="col-xs-12 col-sm-6">
                <TextInput
                  label="Número de identificação fiscal"
                  name="vatId"
                  onInput={this.handleInputChange}
                />
              </div>

              <div className="col-xs-12 col-sm-6">
                <TextInput
                  label="avatar (url)"
                  name="avatar"
                  onInput={this.handleInputChange}
                />
              </div>
            </div>

            <div className="create-card--footer">
                <Button
                  onClick={this.handleCreateClick}
                  icon="check"
                  color="primary">CRIAR UTENTE</Button>

                <Button
                  to="/patients"
                  icon="times"
                  color="">CANCELAR</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PatientCreate
