import React from 'react'
import './Tooltip.css'

const Tooltip = ({ text, children}) => {
  return (
    <span className="tooltip-container">
      <div className="tooltip">{text}</div>
      {children}
    </span>
  )
}

export default Tooltip
