import React, { Component } from 'react'

// components
import TextInput from './../../../../components/Form/TextInput'
import Patient from './Patient'


class PatientSelector extends Component {
  constructor () {
    super()

    this.handlePatientSelect = this.handlePatientSelect.bind(this)
  }

  state = {
    name: ''
  }

  handlePatientSelect (patient) {
    this.props.onSelect(patient)
  }

  render () {
    const { name } = this.state
    const { patients, selected } = this.props

    const rgx = new RegExp(
      name.replace(/\s/g, '|'),
      'gi'
    )

    const filtered = patients.filter(
      _ => rgx.test(_.name) ||
            rgx.test(_.company.name) ||
            (selected && selected._id === _._id)
    )

    return (
      <div>
          <TextInput
            name="search-patient"
            label="nome"
            placeholder="Pesquise aqui um nome"
            value={name}
            onInput={event => this.setState({ name: event.target.value })} />

        <div style={{ maxHeight: '285px', overflow: 'auto' }}>
          {filtered.map((patient, key) => <Patient
            onSelect={this.handlePatientSelect}
            key={key}
            data={patient}
            isSelected={selected && selected._id === patient._id} />)}
        </div>
      </div>
    )
  }
}

export default PatientSelector
