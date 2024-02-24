import { API_URL, API_KEY, UNITS } from './constants/api.js'
import { baseFetch } from './helpers/baseFetch.js'

function createWeatherApiService() {

  function getWeatherByCity(city) {
    return baseFetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=${UNITS}`)
  }

  function getWeatherByLocation(lat, lon) {
    return baseFetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}`)
  }

  return {
    getWeatherByCity,
    getWeatherByLocation
  }
}

export const weatherApiService = createWeatherApiService()