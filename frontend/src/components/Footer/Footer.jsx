import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Typography} from '@mui/material';
import './Footer.css';
import axios from 'axios';
import {currencyAction} from '../../actions';


export const Footer = () => {
  const dispatch = useDispatch();
  const [country, setCountry] = useState("");
  const currency = useSelector(state => state.currency)
  const [currentCurrency, setCurrency] = useState(currency);

  useEffect(() => {

    axios.get('https://ipapi.co/json/').then((response) => {
      let data = response.data;
      console.log("Country", data)
      setCountry(data.country_name);
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  const onChangeCurrency = event => {
    let currency = event.target.value;
    console.log("Event ", event.target.value)
    setCurrency(event.target.value)
    dispatch(currencyAction(currency))
  };

  return (
    <div>
      <Typography variant="h6" component="h6">
        <ul>

          <li>Country: {country}</li>
          <li>
            <select name="currency" id="currecny" value={currentCurrency} onChange={onChangeCurrency}>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="DOWN">DOWN</option>
              <option value="YEN">YEN</option>
              <option value="KNO">KNO</option>
            </select>
          </li>
          {/*<li>*/}
          {/*  Currency: {currency}*/}
          {/*</li>*/}
        </ul>
      </Typography>
      <hr style={{borderTop: "gray"}}/>
    </div>
  )
}
