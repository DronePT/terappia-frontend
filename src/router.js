// components
import Dashboard from './views/Dashboard/Dashboard'
import Patients from './views/Patients/Patients'
import Appointments from './views/Appointments/Appointments'


const routes = [
  {
    path: '/dashboard',
    component: Dashboard
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
