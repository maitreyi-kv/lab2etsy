const currencyReducer = (state = [], action) => {
  console.log("Currency Reducer", action.type);
  const {payload, type} = action
  switch (type) {
    case 'CURRENCY':
      console.log("change currency", payload);
      localStorage.setItem("currency", payload);
      return payload
    default:
      return localStorage.getItem("currency");

  }
}

export default currencyReducer;
