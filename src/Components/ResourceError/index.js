import React from 'react'

import { Link } from 'react-router-dom'

if(process.env.NODE_ENV !== 'test') require('./style.css')

export const ResourceError = () => (
  <div className='re_container'>
    <h1>Hey!</h1>
    <h2>To add a new resource you should first add a Topic.</h2>
    <Link to='/training/topics'>Click here to add a new topic</Link>
  </div>
)
