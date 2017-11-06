import React from 'react'

const MonthDay = ({ day, selected, ...rest }) => {
  return (
    <a
      href={`#${day.date()}`}
      className={`day ${selected?'is-selected':''}`}
      onDragStart={e => e.preventDefault()}
      {...rest}>
        <span>{day.date()}</span>
    </a>
  )
}

export default MonthDay
