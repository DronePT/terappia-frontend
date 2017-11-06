import React from 'react'

// components
import Patients from './views/Patients/Patients'
import Appointments from './views/Appointments/Appointments'


const routes = [
  {
    path: '/dashboard',
    render: () => (<h1>Dashboard</h1>)
  },
  {
    path: '/appointments',
    component: Appointments
  },
  {
    path: '/patients',
    component: Patients
  }
]

export default routes
