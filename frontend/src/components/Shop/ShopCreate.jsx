import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';
import {URL} from '../../constants';

function ShopCreate() {
  const [shop, setShop] = useState(null);
  const [shopName, setShopName] = useState("");
  const [available, setAvailable] = useState(false);
  const login = useSelector(state => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Shop change====", shop)
    if (shop) {
      navigate(`/shophome?name=${shop}`);
    }
  }, [shop])

  useEffect(() => {
    console.log("Shop fetch");
    const checkShopExists = async () => {
      const config = {
        method: 'get',
        url: `${URL}/shop/`,
        headers: login ? {Authorization: login} : {}
      };

      console.log("URL", config.url);
      const resp = await axios(config);
      console.log("Shop get===", resp.data);
      setShop(resp.data);
      return resp.data;
    }

    checkShopExists().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));

  }, []);

  const checkAvailability = () => {
    // ShopName
    const checkShopAvail = async () => {
      const config = {
        method: 'post',
        url: `${URL}/shop/availability`,
        headers: login ? {Authorization: login} : {},
        data: {ShopName: shopName}
      };

      console.log("URL", config.url);
      const resp = await axios(config);
      console.log("Shop avilaibility===", resp.data);
      setAvailable(resp.data);
      return resp.data;
    }

    checkShopAvail().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));
  }

  const createShop = () => {
    const createNewShop = async () => {
      const config = {
        method: 'post',
        url: `${URL}/shop/create`,
        headers: login ? {Authorization: login} : {},
        data: {ShopName: shopName}
      };

      console.log("URL", config.url);
      const resp = await axios(config);
      console.log("Shop created===", resp.data);
      return resp.data;
    }

    createNewShop().then(r => {
      console.log("Success", r);
      setShop(r.ShopName);
    }).catch(err => console.log("Error in Products useEffect", err));
  }

  return (
    <div>
      {/*{shop ? <Navigate to="shophome?name=shop" /> : ""}*/}

      {
        !shop &&
        <div>
          <label> Store Name:<input type="text" name="name" value={shopName}
                                    onChange={(e) => setShopName(e.target.value)}/></label>
          <button onClick={checkAvailability}> Check Availability</button>
          {available ? <button onClick={createShop}> Create Shop </button> : ''}
        </div>
      }</div>
  )
}

export default ShopCreate
