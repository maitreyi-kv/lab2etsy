import React from 'react'
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import AddCartProduct from '../AddCart/AddCartProduct';
import PurchasedOrders from './PurchasedOrders';

function Purchase() {
  const [orders, setOrders] = useState(null);
  const login = useSelector(state => state.login);

  useEffect(() => {
    console.log("Login", login)
    const fetchProduct = async () => {
      const config = {
        method: 'get',
        url: `http://localhost:3001/order`,
        headers: login ? {Authorization: login} : {}
      };

      console.log("URL", config);
      const resp = await axios(config);
      setOrders(resp.data.Orders);
      console.log("Order Res", orders)
      return resp.data;
    }

    fetchProduct().then(r => console.log("In Get Product by ID", r, orders)).catch(err => console.log("Error in" +
      " Products" +
      " useEffect", err));

  }, []);

  return (
    <div>
      {orders &&
        <div>
          <div style={{display: "flex", flexWrap: "wrap"}}>
            {
              orders.map((order) => (
                <PurchasedOrders order={{order:order}} />
              ))
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Purchase