const ENV = process.env.NODE_ENV

const base_url_dev = 'http://localhost:8080'
const base_url_prod = 'https://juanvfproaa.herokuapp.com'

export const base_url =
  ENV === 'development' || ENV === 'test' ? base_url_dev : base_url_prod
