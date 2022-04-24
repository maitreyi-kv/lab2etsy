import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import axios from 'axios';
import PurchasedOrders from './PurchasedOrders';
import {URL} from '../../constants';
import Table from 'react-bootstrap/Table';


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
          <div style={{display: "flex", flexWrap: "wrap", width: "80%"}}>
            <Table striped bordered hover>
              <thead>
              <tr>
                <td>Idx</td>
                <td> Orders</td>
              </tr>
              </thead>
              <tbody>
              {
                orders.map((order, idx) => (
                  // console.log("Order", order)
                  <tr>
                    <td>{idx + 1}</td>
                    <td><h6>Total Price {order.TotalPrice}</h6>
                      <h6>Date {order.Date}</h6>
                      <Table striped bordered hover>
                        <thead>
                        <tr>
                          <td>Index</td>
                          <td>Photo</td>
                          <td>Name</td>
                          <td>ShopName</td>
                          <td>Quantity</td>
                          <td>Price</td>
                          <td>Gift</td>
                          <td>Checkbox</td>
                        </tr>
                        </thead>
                        <tbody>
                        <PurchasedOrders order={{order: order.Order}}/>
                        </tbody>
                      </Table></td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
          </div>
        </div>
      }
    </div>
  )
}

export default Purchase
