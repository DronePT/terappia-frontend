import React from 'react'
import moment from 'moment'
import 'moment/locale/pt'

import './PatientCard.css'

// components
import Timeline from './Timeline'

const PatientCard = ({ patient }) => {
  const { lastAppointment, avatar, totals } = patient

  const lastDate = lastAppointment
    ? `Última consulta: ${moment(lastAppointment.date).format('D MMMM')}`
    : 'Sem consultas'

  const backgroundImage = avatar
    ? `url(${avatar})`
    : null

  const pastAppointments = totals && totals.done ? totals.done : 0
  const totalPaid = (totals && totals.paid ? totals.paid : 0).toFixed(2)
  const totalNotPaid = (totals && totals.notpaid ? totals.notpaid : 0).toFixed(2)
  const inDebt = totals && totals.notpaid && totals.notpaid > 0

  return (
    <div className="col-xs-12 col-sm-6 col-lg-4">
      <div className="patient-card">
        <div className="patient-card--header">
          <div className="top">
            <div className="avatar">
              <div
                className="photo"
                style={{backgroundImage}}
              ></div>
            </div>
            <div className="data">
              <div className="name">{patient.name}</div>
              <div className="date">{lastDate}</div>
            </div>
            <div className="status">
              <div className={inDebt?'bg-red':'bg-green'}>
                <i className={`fa fa-${inDebt?'exclamation':'check'}`}></i>
              </div>
            </div>
          </div>
        </div>

        <div className="patient-card--body">
          <Timeline data={patient.appointments} />
        </div>

        <div className="patient-card--footer">
          <div className="badges">
              <div className="badge">
                <div>
                  <i className="fa fa-calendar" style={{color: '#1574ff'}}></i>
                  <span>{pastAppointments}</span>
                </div>
                <div className="label">consultas realizadas</div>
              </div>

              <div className="badge-separator" />

              <div className="badge">
                <div>
                  <i className="fa fa-check" style={{color:'#28c96d'}}></i>
                  <span>{totalPaid} &euro;</span>
                </div>
                <div className="label">valor recebido</div>
              </div>

              <div className="badge-separator" />

              <div className="badge">
                <div>
                  <i className="fa fa-times" style={{color:'#f9334b'}}></i>
                  <span>{totalNotPaid} &euro;</span>
                </div>
                <div className="label">valor por receber</div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PatientCard
