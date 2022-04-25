// const signIn = (payload) => { return {type: "SIGN_IN", payload: payload} }
// const signOut = () => { return {type: "SIGN_OUT"} }
const currencyAction = (payload) => { return {type: "CURRENCY", payload: payload} }
const loginAction = (payload) => { return {type: "LOGIN", payload: payload} }
const logoutAction = () => { return {type: "LOGOUT"} }
// const updateCart = (payload) => { return {type: "CART", payload: payload} }

export { currencyAction, loginAction, logoutAction };
