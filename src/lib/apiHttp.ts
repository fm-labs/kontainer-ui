import axios from 'axios'

export const apiHttp = () => {
  // read base url from session storage
  // const baseUrl = sessionStorage.getItem('AGENT_API_BASEURL') || AGENT_API_BASEURL

  const baseUrl = sessionStorage.getItem('AGENT_API_BASEURL') || '/api'
  console.log('API BASE URL', baseUrl)

  return axios.create({
    baseURL: baseUrl,
    // `withCredentials` indicates whether or not cross-site Access-Control requests
    // should be made using credentials
    withCredentials: false,
    // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
    xsrfCookieName: 'csrftoken',
    // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
    xsrfHeaderName: 'X-CSRFToken',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}
