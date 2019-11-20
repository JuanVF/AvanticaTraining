import FetchTopic from '../../../Util/API/FetchTopic'
import { test_token } from '../../../Util/API/constants'

beforeAll(() => {
	const accessToken = test_token
	localStorage.setItem('login_token', accessToken)

	FetchTopic.setTestToken()
})

afterAll(() => {
	localStorage.clear()
})

describe('Test API functions on FetchTopic.js', () => {
	var savedItemId
	test('Try to save a topic', async () => {
		const body = {
			name: 'Jest by Jhon Doe'
		}

		const httpStatus = await FetchTopic.saveTopic(body)
		expect(httpStatus).toBe(200)
	})

	test('Try to get all topics', async () => {
		const Topics = await FetchTopic.getTopics()

		const savedItem = Topics[Topics.length - 1]
		savedItemId = savedItem.topic_id

		expect(Topics.length).toBeGreaterThan(0)
	})

	test('Try to get one topic', async () => {
		const Topic = await FetchTopic.getTopic(savedItemId)

		expect(Topic.name).toMatch(/Jest/)
	})

	test('Try to update the saved topic', async () => {
		const body = {
			name: 'Jest',
			topic_id: savedItemId
		}

		const httpStatus = await FetchTopic.updateTopic(body)

		expect(httpStatus).toBe(200)
	})

	test('Try to delete the saved topic', async () => {
		const httpStatus = await FetchTopic.deleteTopic(savedItemId)

		expect(httpStatus).toBe(200)
	})
})

describe('Verify the error handlers on Topics.js', () => {
	test('Try to handle a non acceptable body while saving', async () => {
		const body = {
			names: 'Fakes Jhon Does',
			lastNames: 'The Fakers'
		}

		const httpStatus = await FetchTopic.saveTopic(body)

		expect(httpStatus).toBe(406)
	})

	test('Try to handle a non acceptable body while updating', async () => {
		const body = {
			notName: 'Jest',
			topics_ids: -2
		}

		const httpStatus = await FetchTopic.updateTopic(body)

		expect(httpStatus).toBe(406)
	})
})
