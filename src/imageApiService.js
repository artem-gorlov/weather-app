import { baseFetch } from "./helpers/baseFetch.js"
import { IMAGE_API_URL, IMAGE_ACCESS_KEY } from '../env.js'

function createImageApiService() {
  const URL = IMAGE_API_URL
  const ACCESS_KEY = IMAGE_ACCESS_KEY

  function fetchImageByKeywords(keywords) {
    const options = {
      headers: {
        "Accept-Version": "v1",
        "Authorization": `Client-ID ${ACCESS_KEY}`
      }
    }

    return baseFetch(`${URL}?query=${keywords}&client_id=${ACCESS_KEY}`, options)
  }

  return {
    fetchImageByKeywords
  }
}

export const imageApiService = createImageApiService()