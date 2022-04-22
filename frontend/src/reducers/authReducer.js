const loginReducer = (state = null, action) => {
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
      console.log("default reducer", localStorage.getItem("jwt"))
      return localStorage.getItem("jwt");
  }
}

export default loginReducer;
