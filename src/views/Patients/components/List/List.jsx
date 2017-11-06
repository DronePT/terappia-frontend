import React, { Component } from 'react'
import './List.css'

// helpers
import API from './../../../../helpers/APIClient'

// components
import PatientCard from './../PatientCard/PatientCard'

class List extends Component {
  constructor () {
    super()

    this.handlePageClick = this.handlePageClick.bind(this)
  }

  state = {
    patients: [],
    metadata: { page: 1, totalPages: 1 }
  }

  handlePageClick (page) {
    return event => {
      event.preventDefault()
      const currentMetadata = this.state.metadata

      if (page < 1) return
      if (page > currentMetadata.totalPages) return

      const metadata = { ...currentMetadata, page }
      this.setState({ metadata })

      this.fetchPatients(this.props.searchQuery || '', metadata)
    }
  }

  async fetchPatients (query, { page }) {
    const {
      data: patients,
      metadata
    } = await API.fetchPatients(query, page)

    this.setState({ patients, metadata })
  }

  componentWillMount () {
    this.fetchPatients(this.props.searchQuery || '', this.state.metadata)
  }

  componentWillReceiveProps (nextProps) {
    const { searchQuery } = nextProps
    const currentState = { ...this.state.metadata }

    if (this.props.searchQuery !== searchQuery) currentState.page = 1

    this.fetchPatients(searchQuery, currentState)
  }

  renderPagination () {
    let { page, totalPages } = this.state.metadata

    page = parseInt(page, 10)
    totalPages = parseInt(totalPages, 10)

    const prevPage = page - 1
    const nextPage = page + 1

    const pages = [
      <a
        className={`${prevPage < 1 ? 'is-inactive' : ''}`}
        key="prev"
        href={`#prev`}
        onClick={this.handlePageClick(prevPage)}>
          <i className="fa fa-chevron-left"></i> <span>Anterior</span>
      </a>,
      <span key="pagesinfo">página {page} de {totalPages}</span>,
      <a
        className={`${nextPage > totalPages ? 'is-inactive' : ''}`}
        key="next"
        href={`#next`}
        onClick={this.handlePageClick(nextPage)}>
          <span>Próxima</span> <i className="fa fa-chevron-right"></i>
      </a>
    ]



    // for (let page = 1; page <= totalPages; page++) pages.push(
    //   <a key={page} href={`#{page}`} onClick={this.handlePageClick(page)}>{page}</a>
    // )

    return pages
  }

  render () {
    const { patients } = this.state

    return (
      <div className="patients-list">
        <div className="patients-list-pagination">{this.renderPagination()}</div>

        <div className="row">
          {patients.map((p, i) => <PatientCard key={i} patient={p} />)}
        </div>

        <div className="patients-list-pagination">{this.renderPagination()}</div>
      </div>
    )
  }
}

export default List
