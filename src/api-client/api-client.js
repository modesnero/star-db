export default class ApiClient {
  _apiBase = 'https://swapi.co/api'

  async getResource (url) {
    const res = await fetch(`${this._apiBase}${url}`)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`)
    }
    return await res.json()
  }

  async getPerson (id) {
    const person = await this.getResource(`/people/${id}/`)
    return this._transformPerson(person)
  }

  async getAllPerson () {
    const persons = await this.getResource(`/people/`)
    return persons.results.map(this._transformPerson)
  }

  async getPlanet (id) {
    const planet = await this.getResource(`/planets/${id}/`)
    return this._transformPlanet(planet)
  }

  async getAllPlanets () {
    const planets = await this.getResource(`/planets/`)
    return planets.results.map(this._transformPlanet)
  }

  async getStarship (id) {
    const starship = await this.getResource(`/starships/${id}/`)
    return this._transformStarship(starship)
  }

  async getAllStarships () {
    const starships = await this.getResource(`/starships/`)
    return starships.results.map(this._transformStarship)
  }

  _extractId (url) {
    const idRegExp = /\/([0-9]*)\/$/
    return url.match(idRegExp)[1]
  }

  _transformPerson (person) {
    const { name, gender, birthYear, eyeColor } = person
    return {
      id: this._extractId(person),
      name,
      gender,
      birthYear,
      eyeColor
    }
  }

  _transformPlanet (planet) {
    const { name, url, population, rotation_period, diameter } = planet
    return {
      id: this._extractId(url),
      name,
      population,
      rotationPeriod: rotation_period,
      diameter
    }
  }

  _transformStarship (starship) {
    return {
      id: this._extractId(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacit: starship.cargoCapacit
    }
  }
}
