import FetchSignup from '../../../Util/API/FetchSignup'
import { test_token, luzu_fb_token } from '../../../Util/API/constants'

afterAll(async () => {
	const access_token = test_token

	await fetch('http://localhost:8080/user/delete/jhon@doe.com', {
		method: 'DELETE',
		headers: {
			Authorization: access_token,
			'Content-Type': 'application/json'
		}
	})

	await fetch(
		'http://localhost:8080/fb/delete/luzu_zxanogd_vlogs@tfbnw.net',
		{
			method: 'DELETE',
			headers: {
				Authorization: access_token,
				'Content-Type': 'application/json'
			}
		}
	)
})

describe('Try email-password signup', () => {
	const body = {
		email: 'jhon@doe.com',
		password: 'STRONGEST_PASSWORD_IN_ZAWARDO',
		name: 'Jhon Doe'
	}
	test('Try a successful signup', async () => {
		const httpStatus = await FetchSignup.signup(body)

		expect(httpStatus).toBe(200)
	})

	test('Test if it can handle duplicate email-password users', async () => {
		const httpStatus = await FetchSignup.signup(body)

		expect(httpStatus).toBe(406)
	})
})

describe('Try Facebook signup', () => {
	const body = {
		email: 'luzu_zxanogd_vlogs@tfbnw.net',
		name: 'Luzu Vlogs',
		fbtoken: luzu_fb_token
	}

	test('Try an successful Facebook signup', async () => {
		const httpStatus = await FetchSignup.signupFB(body)

		expect(httpStatus).toBe(200)
	})

	test('Test if it can handle duplicate Facebook users', async () => {
		const httpStatus = await FetchSignup.signupFB(body)

		expect(httpStatus).toBe(406)
	})
})
