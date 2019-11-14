import FetchSignup from '../../../src/Util/API/FetchSignup'
import 'isomorphic-fetch'

afterAll(() => {
  const access_token =
    'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWFudmZsZXRlc0BnbWFpbC5jb20iLCJleHAiOjE1NzQ2MTU5NDR9.OS3tlT4TWz7f-4GMU3vQcIgrtFFPy6PxxS1aDsJQF7gvTV5HgIYQpfO6trp67HJtGFobFjLAUHj6wesjK2TjWw'

  fetch('http://localhost:8080/user/delete/jhon@doe.com', {
    method: 'DELETE',
    headers: {
      Authorization: access_token,
      'Content-Type': 'application/json'
    }
  })

  fetch('http://localhost:8080/fb/delete/luzu_zxanogd_vlogs@tfbnw.net', {
    method: 'DELETE',
    headers: {
      Authorization: access_token,
      'Content-Type': 'application/json'
    }
  })
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
    fbtoken:
      'EAAlVXZAWbEg0BABhLEFv1db7rXBdkwkhGffS3AEHRg1qMFY37CNbzemgQnCMJQSsRsp8NbI1PpTCRY11uYeNeRyciu3lzwkettQpQz4gN8ZBiuL3aRZC3MsP1rqEJfNrarWiUwKJdcJnNgBcY4KspJKXZB0XH5QZCwzNlZCubE5Th2pXRvFQ4jDiUzhKLtn9Fro93mUFP8YwZDZD'
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
