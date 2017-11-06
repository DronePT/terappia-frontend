import axios from 'axios'

const baseURL = 'https://terappia.andrelabs.com/v1/'

class APIClient {
  constructor () {
    this.http = axios.create({
      baseURL,
      timeout: 10000
    })
  }

  async __get (uri) {
    try {
      const result = await this.http.get(uri)
      return result.data
    } catch (error) {
      console.warn(error)
    }
  }

  async __post (uri, payload) {
    try {
      const result = await this.http.post(uri, payload)
      return result.data
    } catch (error) {
      console.warn(error)
    }
  }

  fetchPatients (query = null, page = 1, compact = false, limit = 9) {
    return this.__get(`patients?limit=${limit}&page=${page}${query?`&q=${query}`:''}&compact=${compact}`)
  }

  fetchAppointments (start = '', end = '') {
    return this.__get(`appointments?start=${start}&end=${end}`)
  }

  fetchCompanies () {
    return this.__get('companies')
  }

  createPatient (payload) {
    return this.__post(`patients`, payload)
  }

  createAppointment (payload) {
    return this.__post(`appointments`, payload)
  }
}

export default new APIClient()
