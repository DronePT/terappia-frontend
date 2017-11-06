import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import './Patients.css'

// components
import Header from './components/Header/Header'
import List from './components/List/List'
import PatientCreate from './components/PatientCreate/PatientCreate'

class Patients extends Component {
  constructor () {
    super()

    this.handleSearch = this.handleSearch.bind(this)
  }

  state = { searchQuery: '' }

  handleSearch (searchQuery) {
    this.setState({ searchQuery })
  }

  render () {
    const { searchQuery } = this.state

    return (
      <div className="patients-view">
        <Header onSearch={this.handleSearch} />
        <List searchQuery={searchQuery} />
        <Route path="/patients/add" exact component={PatientCreate} />
      </div>
    )
  }
}

export default Patients
