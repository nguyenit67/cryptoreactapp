## /exchanges?per_page=50&page=1

```js
exchangeApi.getExchangeList =>
return {
    data: productList,
    pagination: {
      page: params._page,
      limit: params._limit,
      total: count,
    },
};
```

## /exchange_rates

returns

```js
"rates": {
  "btc": {
      "name": "Bitcoin",
      "unit": "BTC",
      "value": 1.0,
      "type": "crypto"
  },
  "vnd": {
      "name": "Vietnamese đồng",
      "unit": "₫",
      "value": 826659742.555,
      "type": "fiat"
  },
  ...
}
```

mapping->

```js
[
  { (1)
      currencyCode: "vnd",
      "name": "Vietnamese đồng",
      "unit": "₫",
      "value": 826659742.555,
      "type": "fiat" (2)
  },
  ...
]
```

grouping by currency `"type"` (2)
->

```js
{
  'fiat': [ // recognized currency type
      {
          currencyCode: "vnd",
          "name": "Vietnamese đồng",
          "unit": "₫",
          "value": 826659742.555,
          "type": "fiat" (2)
      },
  ],
  'crypto': [

  ],
  ...
}

```

### create a Hook or Function? to get exchange rate info of a currency

```js
function [use]getExchangeRateInfo(currencyTerm) -> exchangeRate like (1)

  search using `currencyCode`, `name`, `unit`
```
