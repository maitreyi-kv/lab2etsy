import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import {IconButton, Typography} from '@mui/material';
import './Footer.css';
import axios from 'axios';


export const Footer = () => {
  const [country, setCountry] = useState("");
  const [currency, setCurrency] = useState("");

  useEffect(() => {

    axios.get('https://ipapi.co/json/').then((response) => {
      let data = response.data;
      console.log("Country", data)
      setCountry(data.country_name);
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  const onChangeText = event => {
    setCurrency(event.target.value)
  };

  return (
    <div>
      <Typography variant="h6" component="h6">
        <ul>

         <li>Country: {country}</li>
        <li>
          <select name="currency" id="currecny" value={country}>
            <option value="USA">USD</option>
            <option value="India">INR</option>
            <option value="Russia">DOWN</option>
            <option value="China">YEN</option>
            <option value="Ukraine">KNO</option>
          </select>
        </li>
        </ul>
      </Typography>
      <hr style={{borderTop: "gray"}}/>
    </div>
  )
}
