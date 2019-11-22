import FetchSignup from '../../../Util/API/FetchSignup'
import { luzu_fb_token } from '../../../Util/API/constants'
import { cleanup_users } from '../../TestConstants'

afterAll(async () => {
	await cleanup_users()
})

describe('Try email-password signup', () => {
	const body = {
		email: 'jhon@test.doe',
		password: '123456',
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

	test('Try a successful Facebook signup', async () => {
		const httpStatus = await FetchSignup.signupFB(body)

		expect(httpStatus).toBe(200)
	})

	test('if it can handle duplicate Facebook users', async () => {
		const httpStatus = await FetchSignup.signupFB(body)

		expect(httpStatus).toBe(406)
	})
})
