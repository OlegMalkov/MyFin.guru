// @flow
const
  currencies = {},
  countries = {},
  defaultRates = {}

const currencyCodeCountriesMap = Object.keys(countries).reduce((a, k) => {
  if (!a[countries[k].currencies[0]]) a[countries[k].currencies[0]] = [];
  a[countries[k].currencies[0]].push(countries[k]);
  return a
}, {})

const
  currenciesMap = Object.keys(currencies).reduce( // eslint-disable-line
    (a, currencyCode) => {
      let c = []

      const
        currency = currencies[currencyCode],
        countries = currencyCodeCountriesMap[currencyCode]

      if (!countries) {
        console.log('missing country for', currencyCode)
      } else {
        c = countries.map(cn => [cn.alpha2, cn.emoji, cn.name])
      }
      a[currencyCode] = [currency.decimals, defaultRates[currencyCode], currency.name, c];
      return a;
    },
    {},
  )
