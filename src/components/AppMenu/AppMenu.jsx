import React from 'react'
import './AppMenu.css'
import logo from './../../assets/icons/doctor.svg'

import MenuItem from './MenuItem'

const AppMenu = () => {
    return (
        <div className="app-menu-container H100">
            <div className="logo-container">
              <div className="logo">
                <img src={logo} alt=""/>
              </div>
              <div className="logo-alt">TER<strong>app</strong>IA</div>
            </div>

            <ul className="app-menu">
              <MenuItem to="/dashboard" icon="home">Dashboard</MenuItem>
              <MenuItem to="/appointments" icon="calendar">Marcações</MenuItem>
              <MenuItem to="/patients" icon="users">Utentes</MenuItem>
            </ul>
        </div>
    )
}

export default AppMenu
