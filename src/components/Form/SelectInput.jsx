import React from 'react'
import './SelectInput.css'

const SelectInput = ({ label, name, hasError = false, options = [], ...rest }) => {
  const classname = [ 'input select' ]
  if (hasError) classname.push('has-error')

  return (
    <div className={classname.join(' ')}>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        {...rest}>
        {options.map((opt, key) => (
          <option
            key={key}
            value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

export default SelectInput
