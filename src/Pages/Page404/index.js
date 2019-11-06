import React from 'react'
import { Link } from 'react-router-dom'

import './style.css'
import AvanticaLogo from '../../Images/avantica.png'

class Page404 extends React.Component {
  render() {
    return (
      <section className='container page_404_container'>
        <img src={AvanticaLogo} alt='Avantica' />
        <h2>Ups, that page doesn't exists...</h2>
        <Link to='/' className='h5'>
          Click here to go home
        </Link>
      </section>
    )
  }
}

export default Page404
