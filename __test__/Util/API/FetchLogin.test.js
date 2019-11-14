import FetchLogin from '../../../src/Util/API/FetchLogin'
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
        'EAAlVXZAWbEg0BAAavGT4dWtlJSoFSa6bgMc70QqmypnzKLUonnzsP2uko2YZBpKqOGZCiTD9chx9ZAUPRcflW6AMMd8lUyyGijZAZBkYZAOJrckdMun2Cy0z8sX9KhGFNK5hefZBNCAm507knqjJEZBVGSSP10HsxlBeDVneCw9USNc1QVAxn6ZCeTPfgmET9T5jv5UR8bjhyhg1ZADp9waCbgI'
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
