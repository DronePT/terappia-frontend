import React from 'react'
import moment from 'moment'
import 'moment/locale/pt'

import './TimelineItem.css'

const TYPES = {
  checkup: 'CONSULTA DE RESTREIO',
  evaluation: 'CONSULTA DE AVALIAÇÃO',
  intervention: 'CONSULTA DE INTERVENÇÃO',
  other: 'CONSULTA GERAL'
}

const TimelineItem = ({ data }) => {
  return (
    <div className="timeline-item">
      <div className="bullet"></div>
      <div className="date">{moment(data.date).format('D MMM')}</div>
      <div className="icon">
        <i className="fa fa-clock-o"></i>
      </div>
      <div className="data">
        <div className="title">{TYPES[data.type]}</div>
        <div className="description">{data.description || 'sem descrição.'}</div>
        <div className="time">{moment(data.date).format('HH:mm - dddd')}</div>
      </div>
    </div>
  )
}

export default TimelineItem
