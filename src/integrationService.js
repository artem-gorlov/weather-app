import { weatherConditionToIconMapper } from './helpers/mappers.js'
import { formatTemperature } from './helpers/formatTemperature.js'
import { SECOND } from './constants/time.js'
import { imageApiService } from './imageApiService.js'

export function WeatherWidgetService() {  
  async function getBackgroundImage(keywords) {
    const imgResp = await imageApiService.fetchImageByKeywords(keywords)
    console.log('imgResp', imgResp);
    const imgUrl = imgResp.results[0]?.urls.regular
  
    return imgUrl
  }

  function integrateBackgroundImage(url) {
    const appBackgroundElement = document.getElementById('app-background')
  
    if(!appBackgroundElement) {
      throw new Error('Element with id "app-background" not found!')
    }
  
    appBackgroundElement.style.backgroundImage = `url(${url})`
  }

  function integrateTemperature(temperature) {
    const temperatureElement = document.querySelector('#weather-widget > .temp > p')
  
    if(!temperatureElement) {
      throw new Error('Element with selector "#weather-widget > .temp > p" not found!')
    }
  
    temperatureElement.textContent = temperature
  }

  function integrateCity(city) {
    const locationElement = document.querySelector('#weather-widget > .meta > .location > p')
  
    if(!locationElement) {
      throw new Error('Element with selector "#weather-widget > .meta > .location > p" not found!')
    }
  
    if(!city) {
      throw new Error('City is not defined!')
    }
  
    locationElement.textContent = city
  }

  function integrateDate(currentDate) {
    const dateElement = document.querySelector('#weather-widget > .meta > .date > p')
  
    if(!dateElement) {
      throw new Error('Element with selector "#weather-widget > .meta > .date > p" not found!')
    }
  
    if(!currentDate) {
      throw new Error('Date is not defined!')
    }
  
    if(!(currentDate instanceof Date)) {
      throw new Error('Date is not an instance of Date!')
    }
  
    const time = currentDate.toLocaleTimeString({}, {hour: '2-digit', minute: '2-digit'})
    const day = currentDate.toLocaleDateString('en-EN', { weekday: 'long' })
    const date = currentDate.getDate()
    const month = currentDate.toLocaleDateString('en-EN', { month: "short" })
    const year = currentDate.getFullYear()
  
  
    dateElement.textContent = `${time} - ${day}, ${date} ${month} ${year}`
  }

  function integrateIcon(iconCode) {
    const iconElement = document.querySelector('#weather-widget > .icon > i')
  
    if(!iconElement) {
      throw new Error('Element with selector "#weather-widget > .icon > i" not found!')
    }
  
    if(!iconCode) {
      throw new Error('Icon code is not defined!')
    }
  
    const iconClass = weatherConditionToIconMapper(iconCode)
  
    iconElement.className = iconClass
  }

  async function process(weatherData) {
    const imgUrl = await getBackgroundImage(`${weatherData.name}`)

    integrateBackgroundImage(imgUrl)

    integrateTemperature(formatTemperature(weatherData.main?.temp))
    integrateCity(weatherData.name)

    setInterval(() => { 
      integrateDate(new Date())
     }, SECOND)

    integrateIcon(weatherData.weather[0].icon)
  }

  return {
    process
  }
}