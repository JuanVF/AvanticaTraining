import FetchResource from '../../../Util/API/FetchResource'
import { test_token } from '../../../Util/API/constants'

beforeAll(() => {
	const accessToken = test_token
	localStorage.setItem('login_token', accessToken)
	FetchResource.setTestToken()
})

afterAll(() => {
	localStorage.clear()
})

describe('Test API functions on FetchResource.js', () => {
	var savedItemId

	test('Try to add a resource', async () => {
		const body = {
			description: 'Bootstrap',
			url: 'https://getbootstrap.com/',
			topic: {
				topic_id: 1
			}
		}

		const httpStatus = await FetchResource.save(body)
		expect(httpStatus).toBe(200)
	})

	test('Try to get all resources', async () => {
		const Resources = await FetchResource.getAll()

		const lastItem = Resources[Resources.length - 1]
		savedItemId = lastItem.resource_id

		expect(Resources.length).toBeGreaterThan(0)
	})

	test('Try to update a resource', async () => {
		const body = {
			resource_id: savedItemId,
			description: 'node.js',
			url: 'https://nodejs.org/es/',
			topic: {
				topic_id: 1
			}
		}
		const httpStatus = await FetchResource.update(body)

		expect(httpStatus).toBe(200)
	})

	test('Try get relations', async () => {
		const Relations = await FetchResource.checkHowManyRelationsAre(1)

		expect(Relations.length).toBeGreaterThan(0)
	})

	test('Try to delete a resource', async () => {
		const httpStatus = await FetchResource.delete(savedItemId)

		expect(httpStatus).toBe(httpStatus)
	})
})

describe('Test error handlers on FetchResource.js', () => {
	test('Getting a Bad Request on saving', async () => {
		const body = {
			not: 'an',
			acceptable: 'body'
		}

		const httpStatus = await FetchResource.save(body)

		expect(httpStatus).toBe(400)
	})

	test('Getting a Bad Request on updating', async () => {
		const body = {
			ids: 2,
			description: 'GraphQL Documentation with GoLang',
			url: 'https://graphql.org/code/#go',
			topicDs: {
				idss: 1
			}
		}

		const httpStatus = await FetchResource.update(body)

		expect(httpStatus).toBe(400)
	})
})
