import { useEffect } from 'react'
import { getCurrencies } from '../api/currencyApi'

export function HomePage() {
  useEffect(() => {
    getCurrencies()
      .then((currencies) => {
        console.log('Currencies:', currencies)
      })
      .catch((error: unknown) => {
        console.error('Failed to load currencies:', error)
      })
  }, [])

  return (
    <main>
      <h1>Currency converter</h1>

      <p>
        <label>
          Amount <input value="1" readOnly />
        </label>
      </p>
      <p>
        <label>
          From{' '}
          <select disabled defaultValue="GBP">
            <option value="GBP">GBP</option>
          </select>
        </label>
      </p>
      <p>
        <label>
          Converted <input value="" readOnly />
        </label>
      </p>
      <p>
        <label>
          To{' '}
          <select disabled defaultValue="EUR">
            <option value="EUR">EUR</option>
          </select>
        </label>
      </p>
    </main>
  )
}