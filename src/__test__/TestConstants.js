import {
	test_token,
	samantha_fb_token,
	madison_fb_token
} from '../Util/API/constants'
import FetchSignup from '../Util/API/FetchSignup'

export const cleanup_users = async () => {
	await fetch(
		'http://localhost:8080/fb/delete/samantha_ezuxmjf_castillo@tfbnw.net',
		{
			method: 'DELETE',
			headers: {
				Authorization: test_token,
				'Content-Type': 'application/json'
			}
		}
	)

	await fetch(
		'http://localhost:8080/fb/delete/luzu_zxanogd_vlogs@tfbnw.net',
		{
			method: 'DELETE',
			headers: {
				Authorization: test_token,
				'Content-Type': 'application/json'
			}
		}
	)

	await fetch(
		'http://localhost:8080/fb/delete/madison_iyrguwu_tester@tfbnw.net',
		{
			method: 'DELETE',
			headers: {
				Authorization: test_token,
				'Content-Type': 'application/json'
			}
		}
	)

	await fetch('http://localhost:8080/user/delete/test@jhon.doe', {
		method: 'DELETE',
		headers: {
			Authorization: test_token,
			'Content-Type': 'application/json'
		}
	})

	await fetch('http://localhost:8080/user/delete/jhon@test.doe', {
		method: 'DELETE',
		headers: {
			Authorization: test_token,
			'Content-Type': 'application/json'
		}
	})

	await fetch('http://localhost:8080/user/delete/fetch@jhon.doe', {
		method: 'DELETE',
		headers: {
			Authorization: test_token,
			'Content-Type': 'application/json'
		}
	})
}

export const insert_test_users = async () => {
	const body = {
		email: 'test@jhon.doe',
		password: '123456',
		name: 'Jhon Doe'
	}

	const fetch_body = {
		email: 'fetch@jhon.doe',
		password: '123456',
		name: 'Jhon Doe'
	}

	const fb_body = {
		email: 'samantha_ezuxmjf_castillo@tfbnw.net',
		fbtoken: samantha_fb_token
	}

	const fetch_fb_body = {
		email: 'madison_iyrguwu_tester@tfbnw.net',
		fbtoken: madison_fb_token
	}

	await FetchSignup.signup(body)
	await FetchSignup.signup(fetch_body)
	await FetchSignup.signupFB(fb_body)
	await FetchSignup.signupFB(fetch_fb_body)
}
