import React, { Component } from 'react'
import ApiClient from '../../api-client'

import './random-planet.css'

export default class RandomPlanet extends Component {
  apiClient = new ApiClient()

  state = {
    planet: {}
  }

  constructor () {
    super()
    this.updatePlanet()
  }

  updatePlanet () {
    const id = Math.floor(Math.random() * (15 - 1 + 1)) + 1
    this.apiClient.getPlanet(id).then(planet => this.setState({ planet }))
  }

  render () {
    const {
      planet: { id, name, population, rotationPeriod, diameter }
    } = this.state
    return (
      <div className='random-planet jumbotron rounded'>
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
}
