import React from 'react'
import debounce from 'lodash/debounce'

import './Header.css'

// components
import Button from './../../../../components/Button/Button'

const Header = ({ onSearch = _=>_ }) => {

  const triggerSearch = debounce(onSearch, 500)

  return (
    <div className="patients-header">
      <div className="row">
        <div className="col-xs col-md-9">
          <input
            type="text"
            name=""
            id=""
            placeholder="Pesquisar pelo nome..."
            onInput={event => triggerSearch(event.target.value)} />
        </div>
        <div className="col-xs-12 col-md-3">
          <Button
            to="/patients/add"
            size="large"
            color="primary"
            icon="plus"
          >CRIAR UTENTE</Button>
        </div>
      </div>
    </div>
  )
}

export default Header
