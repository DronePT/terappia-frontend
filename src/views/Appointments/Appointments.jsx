import React from 'react'
import { Switch, Route } from 'react-router-dom'

// components
import AppointmentsCalendar from './AppointmentsCalendar'

const Appointments = () => {
  return (
    <Switch>
      <Route path="/appointments/add" exact component={AppointmentsCalendar} />
      <Route
        path="/appointments/:appointment"
        exact
        render={_ => <div>wip</div>} />
      <Route component={AppointmentsCalendar} />
    </Switch>
  )
}

export default Appointments
