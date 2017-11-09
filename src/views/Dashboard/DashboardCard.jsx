import React from 'react'

import {hexToRgb} from './../../helpers/colors'

const DashboardCard = ({ data }) => {
  let { color, name, icon, value, type } = data

  if (color) color = hexToRgb(color, .1)

  return (
    <div className="dashboard-card col-xs-12 col-sm-4">
      <div className="dashboard-content">
        <span className="icon">
            <i
              className={`fa fa-${icon}`}
              style={{ color }}></i>
        </span>
        <div className="title">{name}</div>
        <div className="data">
          {type === 'money' ? `${value.toFixed(2)} €` : value}
        </div>
      </div>
    </div>
  )
}

export default DashboardCard
