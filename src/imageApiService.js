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

    console.log('ret', ret);
    if (!ret?.results.length) {
      return {
        results: [
          {
            urls: {
              regular: 'https://st.volga.news/image/w1280/h851/fixed/7ae6c8ca-3e8a-498d-bcff-0176b9e587b3.jpg'
            }
          }
        ]
      }
    }

    return ret
  }

  return {
    fetchImageByKeywords
  }
}

export const imageApiService = createImageApiService()