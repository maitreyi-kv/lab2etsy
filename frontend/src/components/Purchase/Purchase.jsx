import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import axios from 'axios';
import {URL} from '../../constants';
import PurchaseList from './PurchaseList';
import Pagination from './Pagination';

function Purchase() {
  //Reference : https://github.com/bradtraversy/simple_react_pagination/blob/master/src/App.js

  const [orders, setOrders] = useState([]);
  const login = useSelector(state => state.login);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);

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

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const indexOfLastOrder = currentPage * postsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - postsPerPage;
  const currentOrder = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div>
      <select value={postsPerPage} onChange={(e) => setPostsPerPage(parseInt(e.target.value))}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>
      <PurchaseList orders={currentOrder} loading={loading}/>
      <Pagination ordersPerPage={postsPerPage} totalOrders={orders.length} paginate={paginate}/>
    </div>
  )
}

export default Purchase
