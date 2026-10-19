export interface Currency {
    code: string
    name: string
    symbol: string
    id: number
    short_code: string
}
  
export interface ApiMeta {
    code: number
    disclaimer: string
}

export interface CurrencyRecord {
    id: number
    code: string
    short_code: string
    name: string
    symbol: string
    decimal_mark: string
    thousands_separator: string
    symbol_first: boolean
    precision: number
    subunit: number
}

export interface CurrenciesResponsePayload {
    meta: ApiMeta
    response: CurrencyRecord[]
}

//Data structure of the response
// "meta": {
//     "code": 200,
//     "disclaimer": "Usage subject to terms: https:\/\/currencybeacon.com\/terms"
// },
// "response": [
//     {
//         "id": 1,
//         "name": "UAE Dirham",
//         "short_code": "AED",
//         "code": "784",
//         "precision": 2,
//         "subunit": 100,
//         "symbol": "\u062f.\u0625",
//         "symbol_first": true,
//         "decimal_mark": ".",
//         "thousands_separator": ","
//     },


export interface ConvertResponsePayload {
    meta: ApiMeta
    response: {
      from: string
      to: string
      amount: number
      value: number
    }
  }