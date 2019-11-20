import VerifyToken from '../../../Util/API/VerifyToken'
import {
	test_token,
	non_api_token,
	expired_token
} from '../../../Util/API/constants'

afterEach(() => {
	localStorage.removeItem('login_token')
})

describe('Test tokens in VerifyToken.js', () => {
	test('Test a expired token', async () => {
		const expiredToken = expired_token
		localStorage.setItem('login_token', expiredToken)

		VerifyToken.setTestToken()
		const isAValidToken = await VerifyToken.isAValidToken()

		expect(isAValidToken).toBeFalsy()
	})

	test('Test a valid token', async () => {
		const token = test_token
		localStorage.setItem('login_token', token)

		VerifyToken.setTestToken()
		const isAValidToken = await VerifyToken.isAValidToken()

		expect(isAValidToken).toBeTruthy()
	})

	test('Non API JWT generated', async () => {
		const nonAPIToken = non_api_token
		localStorage.setItem('login_token', nonAPIToken)

		VerifyToken.setTestToken()
		const isAValidToken = await VerifyToken.isAValidToken()
		expect(isAValidToken).toBeFalsy()
	})
})
