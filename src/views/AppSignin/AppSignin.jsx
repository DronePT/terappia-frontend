import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import debounce from 'lodash/debounce'

import './AppSignin.css'

import logo from './../../assets/icons/doctor.svg'

// components
import TextInput from './../../components/Form/TextInput'
import Button from './../../components/Button/Button'

// helpers
import API from './../../helpers/APIClient'


class AppSignin extends Component {
  state = {
    email: '',
    password: '',
    error: null,
    successLogin: false,
    isLoading: false
  }

  handleChange (event) {
    const { name, value } = event.target

    this.setState({ [name]: value })
  }

  handleLoginClick (event) {
    event.preventDefault()

    const { email, password, isLoading } = this.state

    if (isLoading) return

    this.login({ email, password })
  }

  login = debounce(async function (payload) {
    this.setState({
      isLoading: true,
      error: null
    })

    const login = await API.login(payload)

    const state = !login
      ? { error: 'E-mail ou Password inválido' }
      : { successLogin: true }

    this.setState({ ...state, isLoading: false })
  }, 500)

  render () {
    const { email, password, error, successLogin } = this.state

    if (successLogin) return <Redirect to='/dashboard'/>

    return (
      <div className="app-signin">
        <div className="app-signin-form">
          <div className="app-sf--header">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </div>

          <div className="app-sf--body">
            <TextInput
              type="text"
              name="email"
              label="E-mail"
              value={email}
              onChange={this.handleChange.bind(this)} />

            <TextInput
              type="password"
              name="password"
              label="Password"
              password={password}
              onChange={this.handleChange.bind(this)} />
          </div>

          <div className="app-sf--footer">
            {error ? <label htmlFor="email" className="error">{error}</label> : null}
            <Button
              color="primary"
              onClick={this.handleLoginClick.bind(this)}>Entrar</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default AppSignin
