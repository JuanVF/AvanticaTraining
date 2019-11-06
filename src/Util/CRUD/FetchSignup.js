const base_url = 'http://localhost:8080'

async function signup(data) {
  let status
  let url = `${base_url}/signup`

  let params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  await fetch(url, params)
    .then(res => (status = res.status))
    .catch(err => console.log(err))

  return status
}

async function signup_fb(data) {
  let status
  let url = `${base_url}/fb/signup`

  let params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  await fetch(url, params)
    .then(res => (status = res.status))
    .catch(err => console.log(err))

  return status
}

module.exports = {
  signup: signup,
  signup_fb: signup_fb
}
