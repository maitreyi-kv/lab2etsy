const loginReducer = (state = null, action) => {
  console.log("Login Reducer", action.type);
  const {payload, type} = action
  switch (type) {
    case 'LOGIN':
      console.log("Login reducer", payload);
      localStorage.setItem("jwt", payload);
      return payload
    case 'LOGOUT':
      console.log("Logout reducer");
      localStorage.removeItem("jwt");
      return null
    default:
      console.log("default reducer", localStorage.getItem("jwt"))
      return localStorage.getItem("jwt");
  }
}

export default loginReducer;
