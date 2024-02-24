export const formatTemperature = (temperature) => {
  if(!temperature) {
    throw new Error('Temperature is not defined!')
  }

  const roundFloorTemp = Math.floor(temperature)

  return `${roundFloorTemp}°`
}