import React from 'react'

// components
import TextInput from './../../../../components/Form/TextInput'
import SelectInput from './../../../../components/Form/SelectInput'

const TYPES = [
  { value: 'checkup', label: 'Despiste'},
  { value: 'evaluation', label: 'Avaliação'},
  { value: 'intervention', label: 'Intervenção'},
  { value: 'other', label: 'Outro'}
]

const STATUSES = [
  { value: 'paid', label: 'Realizada e valor pago'},
  { value: 'notpaid', label: 'Realizada mas valor por pagar'},
  { value: 'notdone', label: 'Ainda por realizar'}
]

const update = (data, updateDetails) => {
  return event => {
    const { name, value } = event.target

    updateDetails({ ...data, [name]: value })
  }
}

const AppointmentDetails = ({ data, onUpdate }) => {
  return (
    <div className="row">
      <div className="col-xs-12 col-sm-6">
        <TextInput
          type="number"
          label="preço da consulta"
          name="price"
          value={data.price.toString()}
          onChange={update(data, onUpdate)} />
      </div>

      <div className="col-xs-12 col-sm-6">
        <TextInput
          label="descrição"
          name="description"
          value={data.description}
          onChange={update(data, onUpdate)} />
      </div>

      <div className="col-xs-12 col-sm-6">
        <SelectInput
          name="type"
          label="Tipo de consulta"
          value={data.type}
          onChange={update(data, onUpdate)}
          options={TYPES}
          />
      </div>

      <div className="col-xs-12 col-sm-6">
        <SelectInput
          name="status"
          label="Estado"
          value={data.status}
          onChange={update(data, onUpdate)}
          options={STATUSES}
          />
      </div>
    </div>
  )
}

export default AppointmentDetails
