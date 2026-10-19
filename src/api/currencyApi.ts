import { currencyBeaconAPI } from './client'
import type { Currency, CurrencyRecord } from '../types/currency'


export async function getCurrencies() {
    try {
        const cachedCurrencies = sessionStorage.getItem('currencies')
        if(cachedCurrencies) {
            return JSON.parse(cachedCurrencies)
        }
        
        const { data } = await currencyBeaconAPI.get('/currencies')
        if(data.meta.code !== 200 || !Array.isArray(data.response)) {
            throw new Error('Error: Could not load currencies')
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
    } catch (error) {
        console.error('Failed to load currencies:', error)
        throw new Error('Error: Could not load currencies')
    }
}


export async function convertCurrency(from: string, to: string, amount: number) {
  try {
    const { data } = await currencyBeaconAPI.get('/convert', {
        params: { from, to, amount },
    })
    if (data.meta?.code !== 200 || typeof data.response?.value !== 'number') {
      throw new Error('Could not convert this amount')
    }
    return data.response.value
  } catch (error) {
    console.error('Failed to convert:', error)
    throw new Error('Could not convert this amount')
  }

}