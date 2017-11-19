import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production'
 ? 'https://terappia.andrelabs.com/v1/'
  : 'http://192.168.1.72:1337/v1/'

const handleError = error => {
  if (error.response.status === 401) {
    localStorage.removeItem('token')
    window.location = '/signin'
    return
  }

  console.warn(error)
}

class APIClient {
  constructor () {
    this.http = axios.create({
      baseURL,
      timeout: 10000
    })

    this.http.interceptors.request.use(function (config) {
      if (localStorage.token) {
        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: localStorage.token
          }
        }
      }

      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })
  }

  async __get (uri) {
    try {
      const result = await this.http.get(uri)
      return result.data
    } catch (error) {
      handleError(error)
    }
  }

  async __delete (uri) {
    try {
      const result = await this.http.delete(uri)
      return result.data
    } catch (error) {
      handleError(error)
    }
  }

  async __post (uri, payload) {
    try {
      const result = await this.http.post(uri, payload)
      return result.data
    } catch (error) {
      handleError(error)
    }
  }

  async __put (uri, payload) {
    try {
      const result = await this.http.put(uri, payload)
      return result.data
    } catch (error) {
      handleError(error)
    }
  }

  async login (payload) {
    try {
      const result = await this.http.post('users/auth', payload)
      const { token } = result.data.data

      localStorage.setItem('token', token)

      return token
    } catch (error) {
      return false
    }
  }

  fetchPatients (query = null, page = 1, compact = false, limit = 9) {
    return this.__get(`patients?limit=${limit}&page=${page}${query?`&q=${query}`:''}&compact=${compact}`)
  }

  fetchDashboard () {
    return this.__get(`appointments/dashboard`)
  }

  fetchAppointment (appointment) {
    return this.__get(`appointments/${appointment}`)
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

  updateAppointment (appointment, payload) {
    return this.__put(`appointments/${appointment}`, payload)
  }

  createAppointment (payload) {
    return this.__post(`appointments`, payload)
  }

  cancelAppointment (appointment) {
    return this.__delete(`appointments/${appointment}`)
  }
}

export default new APIClient()
