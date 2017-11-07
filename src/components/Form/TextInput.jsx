import React from 'react'
import './TextInput.css'

const TextInput = ({ type, label, name, hasError = false, ...rest }) => {
  const classname = [ 'input' ]
  if (hasError) classname.push('has-error')

  return (
    <div className={classname.join(' ')}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type || 'text'}
        name={name}
        id={name}
        {...rest} />
    </div>
  )
}

export default TextInput
