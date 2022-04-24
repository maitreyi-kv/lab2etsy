import React, {useEffect, useState} from 'react'
import ProductDashboard from '../Product/ProductDashboard';
import AddCartProduct from './AddCartProduct';
import axios from 'axios';
import {URL} from '../../constants';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function AddCart() {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const login = useSelector(state => state.login);
  const navigate = useNavigate();

  const updatePrice = products => {
    let price = 0;
    if (products) {
      products.map(p => {
        console.log("price  calc", parseFloat(p.Price) * parseInt(p.QuantityChoosen))
        price = price + ( parseFloat(p.Price) * parseInt(p.QuantityChoosen) )
      })
      console.log("Price===", price);
    }
    setTotalPrice(price);
  }

  useEffect(() => {
    window.addEventListener('storage', () => {
      let updatedOrder = JSON.parse(localStorage.getItem('cartItems')) || null;
      console.log("Change in lcoalstorage===", updatedOrder)
      setCart(updatedOrder);
      updatePrice(updatedOrder);
    });
  })

  useEffect(() => {
    return () => {
      let pro = JSON.parse(localStorage.getItem("cartItems"));
      setCart(pro);
      updatePrice(pro);
    };
  }, []);

  const goToPurchase = () => {
    let addCartLocalStorage = JSON.parse(localStorage.getItem("cartItems"));

    const postOrder = async () => {
      const resp = await axios.post(`${URL}/order`, {
        Order: addCartLocalStorage,
        TotalPrice: totalPrice,
        NumberOfItems: 10,
        OrderID: uuidv4()
      }, {
        headers: login ? {Authorization: login} : {}
      });
      console.log("URL ===", resp.data);
      return resp.data;
    }

    postOrder().then(res => console.log("Order response", res)).catch(err => console.log("err", err));
    localStorage.removeItem('cartItems');
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
          {totalPrice ? <h4>Price = {totalPrice}</h4> : "No products in cart" }
          { totalPrice? <button onClick={goToPurchase}>Checkout</button> : " Add items"}
        </div>
      }
    </div>
)
}

export default AddCart
