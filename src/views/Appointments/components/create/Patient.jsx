import React from 'react'
import './Patient.css'

import { hexToRgb } from './../../../../helpers/colors'

const Patient = ({ data, onSelect, isSelected }) => {
  const { color } = data.company
  const backgroundColor = hexToRgb(color, .1)

  return (
    <a
      href={`#${data._id}`}
      className={`patient ${isSelected?'is-selected':''}`}
      onClick={e => { e.preventDefault(); onSelect(data) }}>
      <div className="avatar-container">
        <div className="avatar" style={{ backgroundImage: `url(${data.avatar})`}}></div>
      </div>
      <div className="name">
        {data.name}
        <span
          className="company"
          style={{color, backgroundColor}}>{data.company.name}</span>
      </div>
    </a>
  )
}

export default Patient
