import React, { Component } from 'react'
import ApiClient from '../../api-client'
import Loader from '../loader'

import './random-planet.css'

const RandomPlanetView = ({ planet }) => {
  const { id, name, population, rotationPeriod, diameter } = planet
  return (
    <div className='content'>
      <img
        className='planet-image'
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        alt='Planet'
      />
      <div>
        <h4>{name}</h4>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>
            <span className='term'>Population</span>
            <span>{population}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Rotation Period</span>
            <span>{rotationPeriod}</span>
          </li>
          <li className='list-group-item'>
            <span className='term'>Diameter</span>
            <span>{diameter}</span>
          </li>
        </ul>
      </div>
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

export default class RandomPlanet extends Component {
  apiClient = new ApiClient()

  state = {
    planet: {},
    loading: true,
    error: false
  }

  constructor () {
    super()
    this.updatePlanet()
  }

  onError = err => {
    this.setState({ error: true })
    console.error('Loading random planet failed. ', err)
  }

  updatePlanet = () => {
    console.log(this)
    const id = Math.floor(Math.random() * (15 - 2 + 1)) + 2;
    this.apiClient
      .getPlanet(id)
      .then(planet => {
        this.setState({ planet, loading: false })
      })
      .catch(this.onError)
  }

  render () {
    const { planet, loading, error } = this.state

    let content = loading ? <Loader /> : <RandomPlanetView planet={planet} />
    if (error) content = <ErrorIndicator />

    let wrapClasses = 'random-planet jumbotron rounded'
    if (loading || error) wrapClasses += ' justify-content-center'

    return <div className={wrapClasses}>{content}</div>
  }
}
