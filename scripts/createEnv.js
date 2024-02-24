const fs = require('node-fs');
const dotenv = require('dotenv')
dotenv.config()


function createEnvFile() {
  const envConfigFile = `
  export const WEATHER_API_URL = "${process.env.WEATHER_API_URL}"
  export const WEATHER_API_KEY = "${process.env.WEATHER_API_KEY}"
  export const IMAGE_API_URL = "${process.env.IMAGE_API_URL}"
  export const IMAGE_ACCESS_KEY = "${process.env.IMAGE_API_ACCESS_KEY}"
  `

  fs.writeFile('./env.js', envConfigFile, (err) => {
    if (err) {
      console.error(err)
      throw err
    }
    console.log('The file has been saved!')
  })
}

createEnvFile()