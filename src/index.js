import { weatherApiService } from './apiService.js'
import { DEFAULT_CITY } from './constants/api.js'
import { WeatherWidgetService } from './integrationService.js'
import { Settings } from './constants/settings.js'

const getWeatherByLocationButton = document.getElementById('get-weather-by-location-feature')

function processWeatherByLocation() {
  const onSuccessLocation = (position) => {
    localStorage.setItem(Settings.isLocationFeatureEnabled, true)

    weatherApiService.getWeatherByLocation(position.coords.latitude, position.coords.longitude)
      .then(async data => {
        await WeatherWidgetService().process(data)
      })
  }

  const onErrorLocation = (err) => {
    localStorage.setItem(Settings.isLocationFeatureEnabled, false)
    alert('Не удалось получить ваше местоположение. Разрешите доступ к вашей геолокации.')
    throw new Error(err)
  }

  navigator.geolocation.getCurrentPosition(onSuccessLocation, onErrorLocation)
}

getWeatherByLocationButton.addEventListener('click', processWeatherByLocation)


async function app() {
  const isLocationFeatureEnabled = localStorage.getItem(Settings.isLocationFeatureEnabled)

  if(isLocationFeatureEnabled) {
    processWeatherByLocation()
  } else {
    const weatherData = await weatherApiService.getWeatherByCity(DEFAULT_CITY)

    await WeatherWidgetService().process(weatherData)
  }

  const input = document.getElementById('search')
  let timeoutId

  input.addEventListener('keydown', (e) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      weatherApiService.getWeatherByCity(e.target.value)
      .then(async data => {
        await WeatherWidgetService().process(data)
      })
    }, 700)
  })
}

app()
