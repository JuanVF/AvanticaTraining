import FetchLogin from '../../../Util/API/FetchLogin'
import { samantha_fb_token } from '../../../Util/API/constants'
afterEach(() => {
  localStorage.removeItem('login_token')
})

describe('Email-password login tests with API', () => {
  test('Try a succesful login', async () => {
    const body = {
      email: 'juanvfletes@gmail.com',
      password: 'mpedgpclc5V!'
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
      email: 'samantha_ezuxmjf_castillo@tfbnw.net',
      fbtoken: samantha_fb_token
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
