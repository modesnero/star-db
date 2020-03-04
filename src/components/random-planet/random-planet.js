import React, { Component } from 'react'
import ApiClient from '../../api-client'
import Loader from '../loader'

import './random-planet.css'

const Content = ({ planet }) => {
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

export default class RandomPlanet extends Component {
  apiClient = new ApiClient()

  state = {
    planet: {},
    loading: true
  }

  constructor () {
    super()
    this.updatePlanet()
  }

  updatePlanet () {
    const id = Math.floor(Math.random() * (15 - 2 + 1)) + 2
    this.apiClient.getPlanet(id).then(planet => {
      this.setState({ planet, loading: false })
    })
  }

  render () {
    const { planet, loading } = this.state
    
    const content = loading ? <Loader /> : <Content planet={planet} />

    let wrapClasses = 'random-planet jumbotron rounded'
    if (loading) wrapClasses += ' justify-content-center'

    return (
      <div className={wrapClasses}>
        {content}
      </div>
    )
  }
}
