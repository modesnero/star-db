import React from 'react'
import './loader.css'

const Loader = () => {
  return (
    <div className='container-loader'>
      <div className='box1'></div>
      <div className='box2'></div>
      <div className='box3'></div>
    </div>
  )
}

const ErrorIndicator = () => {
  return (
    <div className='error-indicator'>
      <span className='boom'>BOOM! </span>
      <span>Something has going wrong </span>
      <span>(but we aleady sent droids to fix it)</span>
    </div>
  )
}

export { Loader, ErrorIndicator }
