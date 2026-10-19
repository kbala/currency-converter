# Currency converter

A simple React app that converts an amount from one currency to another using the CurrencyBeacon (https://currencybeacon.com) API.

## Steps to run locally

1. Clone the repository and open the folder.
2. Create a free account at https://currencybeacon.com and copy the API token from the dashboard.
3. Create your env file and paste the token:

```bash
cp .env.example .env
```

```text
VITE_CURRENCYBEACON_API_KEY=your_token_here
```

4. Install dependencies and start the app:

```bash
npm install
npm run dev
```

5. Open http://localhost:5173

The page loads the currency list, defaults From to GBP and To to EUR, and converts the amount you enter.


## Features

1. Currencies list has been stored in to sessionStorage to avoid repeated fetch.
2. Debounce added to avoid too many convertion request

## To Do

1. Style the component
2. Create Common UI component for the flex rows (From & To) to avoid duplication.