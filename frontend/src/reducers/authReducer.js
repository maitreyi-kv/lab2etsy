const loginReducer = (state = [], action) => {
  console.log("Login Reducer", action.type);
  const {payload, type} = action
  switch (type) {
    case 'LOGIN':
      console.log("Login reducer", payload)
      return payload
    case 'LOGOUT':
      console.log("Logout reducer")
      return null
    default:
      return null
  }
}

export default loginReducer;
