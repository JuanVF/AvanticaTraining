import VerifyToken from '../../../Util/API/VerifyToken.js'
import 'isomorphic-fetch'
const ls_mock = require('../../../localStorageMock')

afterAll(() => {
  ls_mock.clear()
})

describe('Test tokens in VerifyToke.js', () => {
  test('Test a expired token', async () => {
    const expiredToken =
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWFudmZsZXRlc0BnbWFpbC5jb20iLCJleHAiOjE1fQ.QqPW6kkZSLW5xDtOq07WRCBorRK7HCFbUQ-1DqjXe3rCpmyLrG6bWW2biKuiwpa0svxeSI6grPXrwFCKtDsczg'
    ls_mock.setItem('login_token', expiredToken)

    const isAValidToken = await VerifyToken.isAValidToken()

    expect(isAValidToken).toBeFalsy()
  })

  test('Test a valid token', async () => {
    const token =
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqdWFudmZsZXRlc0BnbWFpbC5jb20iLCJleHAiOjE1NzQ2Mjk1ODd9.FtKHt_bSwA85QEJlJYoVkKcn10JXHUeylj7A21ZQ_HzMuP8ZWtmQ--haWOMi_EqK0W0WAp9O4xdUJ0kBne5j7Q'
    ls_mock.setItem('login_token', token)
    const isAValidToken = await VerifyToken.isAValidToken()

    expect(isAValidToken).toBeTruthy()
  })

  test('Non API JWT generated', async () => {
    const nonAPIToken =
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJqaG9uQGRvZS5mYWtlIiwiZXhwIjo5OTk5OTk5OTk5OTl9.3cGyS9LLtPDvUJu0G370y5jGJKPe52OkyGpRlYlAs4ayCI8nEpBOwgVDOkNc2BrUwnecQD4U9x1-e0yWIa8YhQ'
    ls_mock.setItem('login_token', nonAPIToken)

    const isAValidToken = await VerifyToken.isAValidToken()
    expect(isAValidToken).toBeFalsy()
  })
})
