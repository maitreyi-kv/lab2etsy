import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import axios from 'axios';
import PurchasedOrder from './PurchasedOrder';
import {URL} from '../../constants';
import Table from 'react-bootstrap/Table';
import PurchaseList from './PurchaseList';

function Purchase() {
  //Reference : https://github.com/bradtraversy/simple_react_pagination/blob/master/src/App.js

  const [orders, setOrders] = useState([]);
  const login = useSelector(state => state.login);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    console.log("Login", login)
    const fetchProduct = async () => {
      setLoading(true);
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
    setLoading(false);

  }, []);

  const indexOfLastOrder = currentPage * postsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - postsPerPage;
  const currentOrder = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div>
      <PurchaseList orders={currentOrder} loading={loading}/>
    </div>
  )
}

export default Purchase
