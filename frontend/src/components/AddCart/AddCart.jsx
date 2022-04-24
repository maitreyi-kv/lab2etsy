import React, {useEffect, useState} from 'react'
import ProductDashboard from '../Product/ProductDashboard';
import AddCartProduct from './AddCartProduct';
import axios from 'axios';
import {URL} from '../../constants';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

function AddCart() {
  const [cart, setCart] = useState(null);
  const login = useSelector(state => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      let pro = JSON.parse(localStorage.getItem("cartItems"));
      setCart(pro);
    };
  }, []);

  const goToPurchase = () => {
    let addCartLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

    const postOrder = async () => {
      const resp = await axios.post(`${URL}/order`, {
        Order: addCartLocalStorage
      }, {
        headers: login ? {Authorization: login} : {}
      });
      console.log("URL ===", resp.data);
      return resp.data;
    }

    postOrder().then(res => console.log("Order response", res)).catch(err => console.log("err", err));
    navigate("/purchase")

    console.log("Local", addCartLocalStorage)
  }


  return (
    <div>
      {cart &&
        <div>
        <div style={{display: "flex", flexWrap: "wrap"}}>
          {cart.map((product) => {
            return (
              <AddCartProduct product={product}/>
            )
          })}
        </div>
          <button onClick={goToPurchase}>Checkout</button>
        </div>
      }
    </div>
)
}

export default AddCart
