const currencyReducer = (state = [], action) => {
  console.log("Currency Reducer", action.type);
  const {payload, type} = action
  switch (type) {
    case 'CURRENCY':
      console.log("change currency", payload)
      return payload
    default:
      return 'USD'
  }
}

export default currencyReducer;
