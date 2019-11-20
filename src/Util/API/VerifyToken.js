const ls = require('local-storage')
const { base_url } = require('./constants')

let access_token = ls.get('login_token')

async function isAValidToken() {
	let isValid
	const url = `${base_url}/token/verify`

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

export default {
	isAValidToken: isAValidToken
}
