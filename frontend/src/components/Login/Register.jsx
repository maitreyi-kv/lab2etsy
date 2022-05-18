import React, {useState} from 'react'
import axios from 'axios';
import {URL} from '../../constants';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Navigate, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const login = useSelector(state => state.login);
  let navigate = useNavigate();

  const onChangeUsername = event => {
    setUsername(event.target.value)
  };

  const onChangePassword = event => {
    setPassword(event.target.value)
  };

  const onChangeEmail = event => {
    setEmail(event.target.value)
  };

  const registerHandler = (event) => {
    event.preventDefault();

    const tryRegisterUser = async () => {
      // Ref: https://graphql.org/graphql-js/graphql-clients/
      var varsToPass = {Name: username, Password: password, Email: email}
      var query = `mutation registerUser($Name: String!, $Password: String!, $Email: String!) {
        registerUser(Name :$Name, Password :$Password, Email: $Email)
      }`;

      fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: varsToPass,
        })
      })
        .then(async r => {
          let res = await r.json()
          console.log("resss", res)
          return res.data.registerUser
        })
        .then(msg => {
          console.log("Response graphql", msg)
          setMessage(msg)
          if (msg === "Created User") {
            navigate("/login");
          }
        });
    }

    tryRegisterUser().then(res => {
    }).catch(err => console.log("Error while creating user", err));

  }

  return (
    <div>
      {login ? <Navigate to="/home"/> : ""}
      <h1>Register</h1>
      {message && <h5>{message}</h5>}
      <Form noValidate style={{width: '60%', marginLeft: '100px'}}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="name" placeholder="Name" value={username} onChange={onChangeUsername} required/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={onChangeEmail} required/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={onChangePassword} required/>
        </Form.Group>
        <Button type="submit" onClick={registerHandler}>Register</Button>
      </Form>
    </div>
  )
}

export default Register;
