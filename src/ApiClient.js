export default class ApiClient {

  _apiBase = 'https://swapi.co/api'

  getResource = async (url) => {
    const res = await fetch(`${this._apiBase}${url}`)
    if (!res.ok) {
      throw new Error(`Url: ${url}`)
    }
    return await res.json() 
  }

  getAllPersons = async () => {
    const res = await this.getResource('/people/')
    return res.results 
  }

  getAllPlanets = async () => {
    const res = await this.getResource('/planets/')
    return res.results 
  }

  getAllStarships = async () => {
    const res = await this.getResource('/starships/')
    return res.results 
  }

  getPerson = (id) => this.getResource(`/people/${id}`)

  getPlanet = (id) => this.getResource(`/planets/${id}`)

  getStarship = (id) => this.getResource(`/starships/${id}`)
}
