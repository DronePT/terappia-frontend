import React, { Component } from 'react'
import './Dashboard.css'

import moment from 'moment'
import 'moment/locale/pt'

import API from './../../helpers/APIClient'

// components
import DashboardCard from './DashboardCard'


const NAMES = {
  count: { name: 'Total agendas', icon: 'calendar', type: 'number' },
  total: { name: 'Total mês', icon: 'eur', type: 'money' },
  paid: { name: 'Total pago', icon: 'check', type: 'money', color: '#009f00' },
  notpaid: { name: 'Total por pagar', icon: 'times', type: 'money', color: '#9f0000' },
  notdone: { name: 'Total por realizar', icon: 'inbox', type: 'money', color: '#00009f' },
}

class Dashboard extends Component {
  state = {
    dashboard: []
  }

  componentWillMount () {
    this.fetch()
  }

  async fetch () {
    const { data } = await API.fetchDashboard()
    const dashboard = this.parse(data[0])

    this.setState({ dashboard })
  }

  parse (data) {
    return Object.keys(data)
      .filter(name => name !== '_id')
      .map(name => ({ ...NAMES[name], key: name, value: data[name ] }))
  }

  render () {
    const { dashboard } = this.state

    return (
      <div className="dashboard">
        <h1>{moment().format('MMMM Y')}</h1>
        <div className="row">
          {
            dashboard.map(
              (data, key) => <DashboardCard data={data} key={key} />
            )
          }
        </div>
      </div>
    )
  }
}

export default Dashboard
