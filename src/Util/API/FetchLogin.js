const ls = require('local-storage')
const { base_url } = require('./constants')

async function login(data) {
  let url = `${base_url}/login`
  let params = {
    method: 'POST',
    body: JSON.stringify(data)
  }

  await fetch(url, params)
    .then(res => {
      return res.json()
    })
    .then(res => {
      if (res.Authorization) ls.set('login_token', res.Authorization)
    })
    .catch(err => {
      return null
    })
}

async function fbLogin(data) {
  let url = `${base_url}/fb/login`
  let params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  await fetch(url, params)
    .then(res => res.json())
    .then(res => {
      if (res.Authorization) ls.set('login_token', res.Authorization)
    })
    .catch(err => {
      return null
    })
}

export default {
  login: login,
  fbLogin: fbLogin
}
