import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import debounce from 'lodash/debounce'

import './CancelAppointment.css'

// helpers
import API from './../../../../helpers/APIClient'

// components
import Modal from './../../../../components/Modal/Modal'
import Button from './../../../../components/Button/Button'

class CancelAppointment extends Component {
  constructor () {
    super()

    this.bindKeyboard = this.bindKeyboard.bind(this)
  }

  state = {
    isLoading: false,
    isRemoved: false
  }

  componentWillMount () {}

  componentDidMount () {
    window.addEventListener('keyup', this.bindKeyboard)
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.bindKeyboard)
  }

  bindKeyboard (event) {
    const key = event.keyCode || event.which
    if (key === 27) this.triggerClose()
  }

  handleCancelClick () {
    const { appointment } = this.props.match.params

    this.setState({ isLoading: true })
    this.cancelAppointment(appointment)
  }

  handleClose () {
    this.triggerClose()
  }

  triggerClose () {
    this.setState({ isRemoved: true })
  }

  cancelAppointment = debounce(async function (payload) {
    console.log('deleteing', payload)

    try {
      await API.cancelAppointment(payload)
      this.triggerClose()
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }, 500);

  render () {
    const { isLoading, isRemoved } = this.state

    if (isRemoved) return <Redirect to="/appointments"/>

    return (
      <Modal
        title="Cancelar marcação"
        loading={isLoading}
        onClose={this.handleClose.bind(this)}>
        <div className="cancel-appointments">
          <div className="ca--body">
            Tem a certeza que pretende cancelar a marcação?
          </div>

          <div className="ca--footer">
            <Button
              onClick={this.handleCancelClick.bind(this)}
              color="danger"
              icon="trash">Sim, cancelar</Button>

            <Button
              onClick={this.handleClose.bind(this)}
              color="gray"
              icon="trash">Não</Button>
          </div>
        </div>
      </Modal>
    )
  }
}

export default CancelAppointment
