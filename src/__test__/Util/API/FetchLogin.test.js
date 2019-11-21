import FetchLogin from '../../../Util/API/FetchLogin'
import { madison_fb_token } from '../../../Util/API/constants'
import { insert_test_users, cleanup_users } from '../../TestConstants'
beforeAll(async () => {
	await insert_test_users()
})

afterAll(async () => {
	await cleanup_users()
})

afterEach(() => {
	localStorage.removeItem('login_token')
})

describe('Email-password login tests with API', () => {
	test('Try a succesful login', async () => {
		const body = {
			email: 'fetch@jhon.doe',
			password: '123456'
		}

		await FetchLogin.login(body)

		const access_token = localStorage.getItem('login_token')

		expect(access_token).toMatch(/Bearer /)
	})

	test('Try an unsuccessful login', async () => {
		const body = {
			email: 'fake@jhon.doe',
			password: 'WEAK_PASSWORD'
		}

		await FetchLogin.login(body)

		const access_token = localStorage.getItem('login_token')

		expect(access_token).toBe(null)
	})
})

describe('Facebook login tests with API', () => {
	test('Try a successful Facebook login', async () => {
		const body = {
			email: 'madison_iyrguwu_tester@tfbnw.net',
			fbtoken: madison_fb_token
		}

		await FetchLogin.fbLogin(body)
		const access_token = localStorage.getItem('login_token')

		expect(access_token).toMatch(/Bearer /)
	})

	test('Try a unsuccessful Facebook login', async () => {
		const body = {
			email: 'fake@jhon.doe',
			fbToken: 'FAKE_TOKEN'
		}

		await FetchLogin.fbLogin(body)

		const access_token = localStorage.getItem('login_token')

		expect(access_token).toBe(null)
	})
})
