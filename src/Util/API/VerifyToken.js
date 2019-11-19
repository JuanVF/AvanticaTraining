const ls = require('local-storage')
const ls_mock = require('../../localStorageMock')
const { base_url } = require('./constants')
const ENV = process.env.NODE_ENV

let access_token = ls.get('login_token')

async function isAValidToken() {
  let isValid
  const url = `${base_url}/token/verify`
  setTestToken()

  const params = {
    method: 'POST',
    headers: {
      Authorization: access_token,
      'Content-Type': 'application/json'
    }
  }
  await fetch(url, params).then(res => {
    switch (res.status) {
      case 200:
        isValid = true
        break
      case 403:
        isValid = false
        break
      default:
        isValid = false
        break
    }
  })

  return isValid
}

function setTestToken() {
  if (ENV === 'test') access_token = ls_mock.getItem('login_token')
}

export default {
  isAValidToken: isAValidToken
}
