import React, {useState} from 'react'
import axios from 'axios';
import {URL} from '../../constants';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
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

  const registerHandler = async (event) => {
    event.preventDefault();
    let config = {
      method: 'post',
      url: `${URL}:3001/auth/register`,
      headers: {},
      data: {Name: username, Email: email, Password: password}
    };

    await axios(config)
      .then(response => {
        console.log("Rregitsering!", response.data)
        setMessage(response.data.message);
      })
      .catch(error => {
        console.log("Error", error);
        return error
      });

    if (message === "Created User") {
      navigate("/login");
    }
  }

  return (
    <div>
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
