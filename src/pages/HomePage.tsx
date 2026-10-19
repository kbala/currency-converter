import { useEffect, useState } from 'react'
import { getCurrencies, convertCurrency } from '../api/currencyApi'
import { CurrencySelect } from '../components/CurrencySelect'
import type { Currency } from '../types/currency'

export function HomePage() {

    const [currencies, setCurrencies] = useState<Currency[]>([])
    const [fromCurrency, setFromCurrency] = useState('GBP')
    const [toCurrency, setToCurrency] = useState('EUR')
    const [amount, setAmount] = useState('')
    const [converted, setConverted] = useState('')

    const handleAmountChange = (value: string) => {
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmount(value)
          }
      }

    const loadCurrencies = async () => {
        try {
            const currencies = await getCurrencies()
            setCurrencies(currencies)
        } catch (error) {
            console.error('Failed to load currencies:', error)
        }
    }
    
    const convertCurrencyValue = async (fromCurrency: string, toCurrency: string, amount: number) => {
        if (amount === 0 || currencies.length === 0) {
            setConverted('')
        }
        try {
            const convertedAmount = await convertCurrency(fromCurrency, toCurrency, amount)
                setConverted(String(convertedAmount))
        } catch (error) {
            console.error('Failed to convert:', error)
            setConverted('')
        }
    }


    useEffect(() => {
            loadCurrencies()
    }, [])

    useEffect(() => {
        convertCurrencyValue(fromCurrency, toCurrency, Number(amount))
    }, [fromCurrency, toCurrency, amount, currencies.length])


  return (
    <main>
      <h1>Currency converter</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label style={{ width: '80px', textAlign: 'right' }}>From</label>
        <CurrencySelect id="currency-from" value={fromCurrency} currencies={currencies} onChange={setFromCurrency} />
        <label style={{ width: '80px', boxSizing: 'border-box' }}>
            Amount
        </label>
        <input
            type="number"
            id="amount"
            inputMode="decimal"
            value={amount}
            onChange={(event) => handleAmountChange(event.target.value)}
            style={{ width: '180px', boxSizing: 'border-box' }}
        />      
        </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label style={{ width: '80px', textAlign: 'right' }}>To</label>
        <CurrencySelect id="currency-to" value={toCurrency} currencies={currencies} onChange={setToCurrency} />
        <label style={{ width: '80px', boxSizing: 'border-box' }}>
            Converted 
        </label>
        <input readOnly value={converted} />
      </div>
    </main>
  )
}