import Alerts from '../../src/Util/Alerts'

describe('Testing possible alerts: ', () => {
  const printMsg = msg => console.log(msg)

  const emptyEmail = ''
  const email = 'jhon@doe.com'
  const fakeEmail = 'jhon@fakedoe'

  const password = 'STRONG_PASSWORD'
  const emptyPassword = ''

  const name = 'Jhon Doe'

  test('verify if a collection of Strings is also empty ', () => {
    const ObjectCollection = [emptyEmail, password, name]

    const isEmpty = Alerts.alertIfObjectsAreEmpty(ObjectCollection, printMsg)

    expect(isEmpty).toBeTruthy()
  })

  test('Verify if it can handle a false email', () => {
    const isAnEmail = Alerts.alertIfIsNotAnEmail(fakeEmail, printMsg)

    expect(isAnEmail).toBeFalsy()
  })

  test('Verify if it can handle a true email', () => {
    const isAnEmail = Alerts.alertIfIsNotAnEmail(email, printMsg)

    expect(isAnEmail).toBeTruthy()
  })

  test('Verify if a collection of Strings are not empty', () => {
    const ObjectCollection = [email, password, name]

    const isEmpty = Alerts.alertIfObjectsAreEmpty(ObjectCollection, printMsg)

    expect(isEmpty).toBeFalsy()
  })

  test('Verify if a collection of String arent empty also verify the email', () => {
    const ObjectCollection = [email, password, name]

    const isAValidData = Alerts.invalidData(ObjectCollection, email, printMsg)

    expect(isAValidData).toBeTruthy()
  })

  test('Verify if a collection of Strings arent empty and also verify a false email', () => {
    const ObjectCollection = [fakeEmail, password, name]

    const isAValidData = Alerts.invalidData(
      ObjectCollection,
      fakeEmail,
      printMsg
    )

    expect(isAValidData).toBeFalsy()
  })

  test('Verify if a collection of Strings are empty and also verify a true email', () => {
    const ObjectCollection = [email, emptyPassword, name]

    const isAValidData = Alerts.invalidData(ObjectCollection, email, printMsg)

    expect(isAValidData).toBeFalsy()
  })

  test('Verify if a collection of Strings are empty and also verify a false email', () => {
    const ObjectCollection = [fakeEmail, emptyEmail, name]

    const isAValidData = Alerts.invalidData(ObjectCollection, email, printMsg)

    expect(isAValidData).toBeFalsy()
  })
})
