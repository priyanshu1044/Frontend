import React from 'react'
import Arpitbala from '../assets/images/hum-pe-to-hai-hi-no-arpit-bala.gif'
import "./PageNotFound.css"

function PageNotFound() {
  return (
    <div className='page-not-found-container'>
        <img src={Arpitbala} alt="hum-pe-to-hai-hi-no-arpit-bala" className='page-not-found-image' />
        <h1 className='page-not-found-header'>404: Hum Pe To Hai Hi No</h1>
        <p className='page-not-found-text'>The page you're looking for doesn't exist or has been moved.</p>
    </div>
  )
}

export default PageNotFound