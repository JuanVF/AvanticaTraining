const { base_url } = require('./constants')

async function signup(data) {
  let status;
  let url = `${base_url}/signup`;

  let params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  await fetch(url, params)
    .then(res => (status = res.status))
    .catch(err => console.log(err));

  return status;
}

async function signupFB(data) {
  let status;
  let url = `${base_url}/fb/signup`;

  let params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  };

  await fetch(url, params)
    .then(res => (status = res.status))
    .catch(err => console.log(err));

  return status;
}

export default {
  signup: signup,
  signupFB: signupFB
};
