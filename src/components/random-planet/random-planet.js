import React, { Component } from 'react'
import Loader from '../loader'
import ErrorIndicator from '../error-indicator'
import ApiClient from '../../api-client'
import RandomPlanetView from './random-planet-view'
import './random-planet.css'

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
    setInterval(this.updatePlanet, 15000)
  }

  onError = err => {
    this.setState({ error: true })
    console.error('Loading random planet failed. ', err)
  }

  updatePlanet = () => {
    console.log(this)
    // const id = Math.floor(Math.random() * (15 - 2 + 1)) + 2
    const id = 1200
    this.apiClient
      .getPlanet(id)
      .then(planet => {
        this.setState({ planet, loading: false })
      })
      .catch(this.onError)
  }

  render () {
    const { planet, loading, error } = this.state

    let content = loading ?
      <Loader /> :
      <RandomPlanetView planet={planet} />
    if (error) content = <ErrorIndicator />

    let wrapClasses = 'random-planet jumbotron rounded'
    if (loading || error) wrapClasses += ' justify-content-center'

    return <div className={wrapClasses}>{content}</div>
  }
}
