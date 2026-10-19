import { currencyBeaconAPI } from './client'
import type { Currency, CurrencyRecord } from '../types/currency'


export async function getCurrencies() {

    const cachedCurrencies = sessionStorage.getItem('currencies')
    if(cachedCurrencies) {
        return JSON.parse(cachedCurrencies)
    }
  
    const { data } = await currencyBeaconAPI.get('/currencies')

    console.log('Raw currencies payload:', data)

    if(data.meta.code !== 200 || !Array.isArray(data.response)) {
        console.log('Error: Could not load currencies')
        return []
    }

    const currencies = data.response.map((currency: CurrencyRecord) => ({
        id: currency.id,
        name: currency.name,
        short_code: currency.short_code,
        code: currency.code,
        symbol: currency.symbol,    
    }))
    .sort((a: Currency, b: Currency) => a.name.localeCompare(b.name))

    sessionStorage.setItem('currencies', JSON.stringify(currencies))

    return currencies
}


export async function convertCurrency(from: string, to: string, amount: number) {
  const { data } = await currencyBeaconAPI.get('/convert', {
    params: { from, to, amount },
  })

  if (data.meta?.code !== 200 || typeof data.response?.value !== 'number') {
    throw new Error('Could not convert this amount')
  }

  return data.response.value
}