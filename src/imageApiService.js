import { baseFetch } from "./helpers/baseFetch.js"
import { IMAGE_API_URL, IMAGE_ACCESS_KEY } from '../env.js'

function createImageApiService() {
  const URL = IMAGE_API_URL
  const ACCESS_KEY = IMAGE_ACCESS_KEY

  async function fetchImageByKeywords(keywords) {
    const options = {
      headers: {
        "Accept-Version": "v1",
        "Authorization": `Client-ID ${ACCESS_KEY}`
      }
    }

    const ret = await baseFetch(`${URL}?query=${keywords}&client_id=${ACCESS_KEY}`, options)

    console.log('keywords.toUpperCase()', keywords.toUpperCase());

    if (!ret?.results.length) {
      if (keywords.toUpperCase() === 'OTRADNYY') {
        return {
          results: [
            {
              urls: {
                regular: 'https://i.postimg.cc/xdwM8NSv/7ae6c8ca-3e8a-498d-bcff-0176b9e587b3.jpg'
              }
            }
          ]
        }
      } else {
        return await baseFetch(`${URL}?query=${keywords},nature&client_id=${ACCESS_KEY}`, options)
      }
    }

    return ret
  }

  return {
    fetchImageByKeywords
  }
}

export const imageApiService = createImageApiService()