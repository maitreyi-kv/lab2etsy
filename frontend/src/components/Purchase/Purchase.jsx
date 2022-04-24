import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import axios from 'axios';
import PurchasedOrders from './PurchasedOrders';
import {URL} from '../../constants';

function Purchase() {
  const [orders, setOrders] = useState(null);
  const login = useSelector(state => state.login);

  useEffect(() => {
    console.log("Login", login)
    const fetchProduct = async () => {
      const config = {
        method: 'get',
        url: `${URL}/order`,
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
                // console.log("Order", order)
                <div>
                  <h4>Order ID{order.OrderID}</h4>
                  <h4>Total Price {order.TotalPrice}</h4>
                <PurchasedOrders order={{order:order.Order}} />
                </div>
              ))
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Purchase
