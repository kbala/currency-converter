import { currencyBeaconAPI } from './client'

export async function getCurrencies() {
  const { data } = await currencyBeaconAPI.get('/currencies')

  console.log('Raw currencies payload:', data)

}