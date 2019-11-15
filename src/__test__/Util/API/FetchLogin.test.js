import FetchLogin from '../../../Util/API/FetchLogin'
import ls from 'local-storage'
import 'isomorphic-fetch'

afterEach(() => {
  ls.remove('login_token')
})

describe('Email-password login tests with API', () => {
  test('Try a succesful login', async () => {
    const body = {
      email: 'juanvfletes@gmail.com',
      password: 'mpedgpclc5V!'
    }

    await FetchLogin.login(body)

    const access_token = ls.get('login_token')

    expect(access_token).toMatch(/Bearer /)
  })

  test('Try an unsuccessful login', async () => {
    const body = {
      email: 'fake@jhon.doe',
      password: 'WEAK_PASSWORD'
    }

    await FetchLogin.login(body)

    const access_token = ls.get('login_token')

    expect(access_token).toBe(null)
  })
})

describe('Facebook login tests with API', () => {
  test('Try a successful Facebook login', async () => {
    const body = {
      email: 'samantha_ezuxmjf_castillo@tfbnw.net',
      fbtoken:
        'EAAlVXZAWbEg0BAE3fV0jvS9Do7xOfTqpzQAlFcGVOC2EQxfmp9ZB4y6na5633Rami4TI9tpDdJWXGgy2UWTS7r8zTi4qxh0p6VGeQN6OY3sEZBC09qSJP0V0vPO7Gl8FD2sHiRtexAfcVsI86j6QAhjIb29w2uRfii0jXZAhvwmVje2dHjV88Dligk5OQztCMkz6CrEepPxYnQzvm8Vw'
    }

    await FetchLogin.fbLogin(body)
    const access_token = ls.get('login_token')

    expect(access_token).toMatch(/Bearer /)
  })

  test('Try a unsuccessful Facebook login', async () => {
    const body = {
      email: 'fake@jhon.doe',
      fbToken: 'FAKE_TOKEN'
    }

    await FetchLogin.fbLogin(body)

    const access_token = ls.get('login_token')

    expect(access_token).toBe(null)
  })
})
