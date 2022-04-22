import React, {useEffect, useState} from 'react';
// import {signIn} from '../../actions';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate, Redirect, useNavigate} from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import Button from 'react-bootstrap/Button';
import {URL} from '../../constants';
import {loginAction} from '../../actions';


const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const login = useSelector(state => state.login);
  console.log("TOken", login);

  useEffect(() => {
    return () => {
      console.log("Token", login);
    };
  }, [login]);


  const onChangeUsername = event => {
    setUsername(event.target.value)
  };

  const onChangePassword = event => {
    setPassword(event.target.value)
  };

  const validateLogin = (event) => {
    event.preventDefault();
    console.log("Validate lofin");
    const tryLoginUser = async () => {
      let config = {
        method: 'post',
        url: `${URL}/auth/login`,
        headers: {},
        data: {Email: username, Password: password}
      };

      console.log("Config", config);
      return axios(config)
        .then(response => {
          console.log("Response login", response);
          return response;
        })
        .catch(error => {
          console.log("Error", error);
          return error
        });
    }

    tryLoginUser().then(res => {
      const {message} = res.data
      if (message === "Logged In Successfully") {
        localStorage.setItem("jwt", res.data.token);
        dispatch(loginAction(res.data.token));
        navigate('/home');
      } else {
        setMessage(message)
      }
    });
  }

  return (
    <div>
      {login ? <Navigate to="/home" /> : ""}
      { message && <h4>{message}</h4> }
      <h2 style={{marginLeft: "100px"}}>Login</h2>
      <div className="center" style={{width: '25%'}}>
        <form style={{width: "100%"}}>
          <label> Name:<input type="text" name="name" value={username} onChange={onChangeUsername}/></label>
          <label> Password:<input type="password" name="pass" value={password} onChange={onChangePassword}/></label>
          <br/>
          <Button onClick={validateLogin} style={{width: "50%"}}>Sign In</Button>
        </form>
      </div>
    </div>
  )
}

export default Login;


