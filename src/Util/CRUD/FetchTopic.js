//Simple fetch CRUD to manage topic data in API
const base_url = 'http://localhost:8080'

async function getTopics(login_token) {
  let data
  let url = `${base_url}/topic`
  let params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: login_token
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

async function getTopic(login_token, topic_id) {
  let data
  let url = `${base_url}/topic/${topic_id}`
  let params = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: login_token
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

async function saveTopic(login_token, topic) {
  let responseStatus
  let url = `${base_url}/topic`
  let params = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: login_token
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

async function updateTopic(login_token, topic) {
  let responseStatus
  let url = `${base_url}/topic`
  let params = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: login_token
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

async function deleteTopic(login_token, topic_id) {
  let responseStatus
  let url = `${base_url}/topic/${topic_id}`
  let params = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: login_token
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

module.exports = {
  getTopics: getTopics,
  getTopic: getTopic,
  saveTopic: saveTopic,
  updateTopic: updateTopic,
  deleteTopic: deleteTopic
}
