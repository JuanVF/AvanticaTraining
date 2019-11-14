const ls = require('local-storage')
const ls_mock = require('../../localStorageMock')

const ENV = process.env.NODE_ENV
const base_url = 'http://localhost:8080'
let access_token = ls.get('login_token')

async function getTopics() {
  let url = `${base_url}/topic`
  let data
  setTestToken()

  let params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: access_token
    }
  }

  await fetch(url, params)
    .then(res => res.json())
    .then(res => {
      data = res
    })
    .catch(err => {
      console.log('An error ocurred while fetching API: ' + err)
    })

  return data
}

async function getTopic(topic_id) {
  let url = `${base_url}/topic/${topic_id}`
  let data
  setTestToken()

  let params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: access_token
    }
  }

  await fetch(url, params)
    .then(res => res.json())
    .then(res => {
      data = res
    })
    .catch(err => {
      console.log('An error ocurred while fetching API: ' + err)
    })

  return data
}

async function saveTopic(topic) {
  let url = `${base_url}/topic`
  let responseStatus
  setTestToken()

  let params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: access_token
    },
    body: JSON.stringify(topic)
  }

  await fetch(url, params)
    .then(res => {
      responseStatus = res.status
    })
    .catch(err => {
      console.log('An error ocurred while fetching API: ' + err)
    })

  return responseStatus
}

async function updateTopic(topic) {
  let url = `${base_url}/topic`
  let responseStatus
  setTestToken()

  let params = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: access_token
    },
    body: JSON.stringify(topic)
  }

  await fetch(url, params)
    .then(res => {
      responseStatus = res.status
    })
    .catch(err => {
      console.log('An error ocurred while fetching API: ' + err)
    })

  return responseStatus
}

async function deleteTopic(topic_id) {
  let url = `${base_url}/topic/${topic_id}`
  let responseStatus
  setTestToken()

  let params = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: access_token
    }
  }

  await fetch(url, params)
    .then(res => {
      responseStatus = res.status
    })
    .catch(err => {
      console.log('An error ocurred while fetching API: ' + err)
    })

  return responseStatus
}

function setTestToken() {
  if (ENV === 'test') access_token = ls_mock.getItem('login_token')
}

module.exports = {
  getTopics: getTopics,
  getTopic: getTopic,
  saveTopic: saveTopic,
  updateTopic: updateTopic,
  deleteTopic: deleteTopic
}
