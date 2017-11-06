import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import './App.css'

import routes from './router'

// components
import AppMenu from './components/AppMenu/AppMenu'

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppMenu />

        <div className="app-content">
          <Switch>
            { routes.map((r, key) => <Route key={key} {...r} />) }
            <Route render={() => 'not found'} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
