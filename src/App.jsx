import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import './App.css'

import routes from './router'

// components
import AppMenu from './components/AppMenu/AppMenu'
import AppSignin from './views/AppSignin/AppSignin'

const AppLogged = () => {
  return (
    <div className="app">
      <AppMenu />

      <div className="app-content">
        <Switch>
          { routes.map((r, key) => <Route key={key} {...r} />) }
          <Redirect to='/dashboard'/>
        </Switch>
      </div>
    </div>
  )
}

class App extends Component {
  render() {
    return (
        <Switch>
          <Route path='/signin' exact component={AppSignin} />
          <Route component={AppLogged} />
        </Switch>
    )
  }
}

export default App
