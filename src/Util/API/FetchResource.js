const ls = require("local-storage");

const base_url = "http://localhost:8080";
const access_token = ls.get("login_token");

async function getAll() {
  let data;
  let url = `${base_url}/resource`;
  let params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  };

  await fetch(url, params)
    .then(res => res.json())
    .then(res => {
      data = res;
    })
    .catch(err => {
      console.log(err);
    });

  return data;
}

async function save(body) {
  let url = `${base_url}/resource`;
  let status;

  let params = {
    method: "POST",
    headers: {
      Authorization: access_token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };

  await fetch(url, params)
    .then(res => {
      status = res.status;
    })
    .catch(err => {
      console.log(err);
      status = err.status;
    });

  return status;
}

async function update(body) {
  let url = `${base_url}/resource`;
  let status;

  let params = {
    method: "PUT",
    headers: {
      Authorization: access_token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };

  await fetch(url, params)
    .then(res => {
      status = res.status;
    })
    .catch(err => {
      console.log(err);
      status = err.status;
    });

  return status;
}

async function deleteResource(id) {
  let url = `${base_url}/resource/${id}`;
  let status;

  let params = {
    method: "DELETE",
    headers: {
      Authorization: access_token,
      "Content-Type": "application/json"
    }
  };

  await fetch(url, params)
    .then(res => {
      status = res.status;
    })
    .catch(err => {
      console.log(err);
      status = err.status;
    });

  return status;
}

/***
 * This functions is used in /src/Pages/Topic/index.js
 * this is util to check if a Topic has relations
 * so it can prevent errors on MyResource.js trying to
 * find a topic that doesn't exists
 * ***/
async function checkHowManyRelationsAre(topic_id) {
  let url = `${base_url}/resource/relations/`;
  let data;

  let body = {
    topic_id: topic_id
  };
  let params = {
    method: "POST",
    headers: {
      Authorization: access_token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  };

  await fetch(url, params)
    .then(res => res.json())
    .then(res => {
      data = res;
    })
    .catch(err => {
      console.log(err);
    });

  return data;
}

module.exports = {
  getAll: getAll,
  save: save,
  update: update,
  delete: deleteResource,
  checkHowManyRelationsAre: checkHowManyRelationsAre
};
