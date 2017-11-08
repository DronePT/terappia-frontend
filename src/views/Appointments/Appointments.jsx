import React from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import AppointmentsCalendar from './AppointmentsCalendar'
import Appointment from './Appointment'

const Appointments = () => {
  return (
    <Switch>
      <Route path="/appointments/add" exact component={AppointmentsCalendar} />
      <Route
        path="/appointments/:appointment"
        exact
        component={Appointment} />
      <Route component={AppointmentsCalendar} />
    </Switch>
  )
}

export default Appointments
