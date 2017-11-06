import React from 'react'
import './Timeline.css'

// components
import TimelineItem from './TimelineItem'

const Timeline = ({ data }) => {
  return (
    <div className="patient-timeline">
      {data.length > 0
        ? data.map((d, i) => <TimelineItem data={d} key={i} />)
        : (
          <div className="patient-timeline--empty">
            <i className="fa fa-calendar fa-4x"></i>
            <span>Sem consultas agendadas</span>
          </div>
        )
      }
    </div>
  )
}

export default Timeline
