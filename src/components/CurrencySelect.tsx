import type { Currency } from '../types/currency'

type CurrencySelectProps = {
  id: string
  value: string
  currencies: Currency[]
  onChange: (value: string) => void
}

export function CurrencySelect({
  id,
  value,
  currencies,
  onChange,
}: CurrencySelectProps) {
  return (
      <select
        id={id}
        value={value}
        disabled={currencies.length === 0}
        onChange={(event) => onChange(event.target.value)}
        style={{ width: '300px', boxSizing: 'border-box' }}
      >
        {currencies.map((currency) => (
          <option key={currency.id} value={currency.short_code}>
            {currency.name} - {currency.short_code}
          </option>
        ))}
      </select>
  )
}