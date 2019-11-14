import parseHome from '../../src/Util/ParseData'

describe('ParseData.js', () => {
  test('parseHomeData function:', () => {
    const testData = [
      {
        resource_id: 1,
        description: 'Node.js documentation',
        url: 'https://nodejs.org/es/',
        topic: {
          topic_id: 1,
          name: 'node.js'
        }
      },
      {
        resource_id: 2,
        description: 'Udemy Node.js Course',
        url: 'https://www.udemy.com/es/topic/nodejs/',
        topic: {
          topic_id: 1,
          name: 'node.js'
        }
      },
      {
        resource_id: 4,
        description: 'React Native Course',
        url: 'https://www.udemy.com/course/react-native-sin-fronteras/',
        topic: {
          topic_id: 3,
          name: 'React.js'
        }
      }
    ]

    const parsedData = parseHome.parseHomeData(testData)

    expect(parsedData.length).toBe(2)
  })
})
