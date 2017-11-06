import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import 'normalize.css'
import 'flexboxgrid'
import 'loaders.css'
import './index.css'

import App from './App.jsx'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(
    <Router>
        <App />
    </Router>,
    document.getElementById('root')
)

registerServiceWorker()
