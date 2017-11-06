import React from 'react'
import './Modal.css'

const Modal = ({ title, children, loading = false, onClose = _=>_ }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        {loading ? (
          <div className="modal--loading">
            <div className="ball-clip-rotate-multiple"><div></div><div></div></div>
            <span>{loading && typeof loading === 'string' ? loading : 'aguarde um momento...'}</span>
          </div>
        ) : (
            <a
              href="#close"
              className="create-card--close"
              onClick={e => { e.preventDefault(); onClose() }}>
              <i className="fa fa-times"></i>
              <span>Fechar</span>
            </a>
        )}
        <div className="modal--header">{title}</div>
        <div className="modal--body">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
