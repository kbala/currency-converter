import axios from 'axios'

export const currencyBeaconAPI = axios.create({
  baseURL: '/api',
  params: {
    api_key: import.meta.env.VITE_CURRENCYBEACON_API_KEY,
  },
})