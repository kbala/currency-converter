import { useEffect, useState } from 'react'
import { getCurrencies } from '../api/currencyApi'
import { CurrencySelect } from '../components/CurrencySelect'
import type { Currency } from '../types/currency'

export function HomePage() {

    const [currencies, setCurrencies] = useState<Currency[]>([])
    const [fromCurrency, setFromCurrency] = useState('GBP')
    const [toCurrency, setToCurrency] = useState('EUR')


    const loadCurrencies = async () => {
        try {
            const currencies = await getCurrencies()
            setCurrencies(currencies)
        } catch (error) {
            console.error('Failed to load currencies:', error)
        }
    }

    useEffect(() => {
        loadCurrencies()
    }, [])


  return (
    <main>
      <h1>Currency converter</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label style={{ width: '80px', textAlign: 'right' }}>From</label>
        <CurrencySelect id="currency-from" value={fromCurrency} currencies={currencies} onChange={setFromCurrency} />
        <label style={{ width: '80px', boxSizing: 'border-box' }}>
            Amount
        </label>
        <input type="number"/>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label style={{ width: '80px', textAlign: 'right' }}>To</label>
        <CurrencySelect id="currency-to" value={toCurrency} currencies={currencies} onChange={setToCurrency} />
        <label style={{ width: '80px', boxSizing: 'border-box' }}>
            Converted 
        </label>
        <input value="1" readOnly />
      </div>
    </main>
  )
}