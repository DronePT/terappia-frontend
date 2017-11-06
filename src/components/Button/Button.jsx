import React from 'react'
import { Link } from 'react-router-dom'

import './Button.css'

const Button = ({ to, children, size, color, icon, ...rest }) => {
  const classname = [ 'button' ]

  if (size) classname.push(`is-${size}`)
  if (color) classname.push(`is-${color}`)
  if (icon) classname.push('has-icon')

  return to
    ? (
      <Link
        onDragStart={e => e.preventDefault()}
        to={to}
        className={classname.join(' ')} {...rest}>
        {icon ? <div className="icon"><i className={`fa fa-${icon}`}></i></div> :null}
        <span>{children}</span>
      </Link>
    )
    : (
    <button className={classname.join(' ')} {...rest}>
      {icon ? <div className="icon"><i className={`fa fa-${icon}`}></i></div> :null}
      <span>{children}</span>
    </button>
  )
}

export default Button
