import React, {useEffect, useState} from 'react'
import AddCartProduct from './AddCartProduct';
import axios from 'axios';
import {URL} from '../../constants';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

function AddCart() {
  const [cart, setCart] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const login = useSelector(state => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    let price = 0;
    if (cart) {
      cart.map(p => {
        console.log("price  calc", parseFloat(p.Price) * parseInt(p.QuantityChoosen))
        price = price + (parseFloat(p.Price) * parseInt(p.QuantityChoosen))
      })
      console.log("Price===", price);
      setTotalPrice(price);
      localStorage.setItem("cartItems", JSON.stringify(cart));
    }
  }, [cart])

  const incQuantity = (e) => {
    console.log("val", e);
    const exist = cart.find((pro) => pro._id === e._id)
    if (exist) {
      setCart(cart.map((item) => item._id === e._id ? {
        ...exist,
        QuantityChoosen: parseInt(exist.QuantityChoosen) + 1
      } : item))
    }
  }

  const decQuantity = (e) => {
    console.log("val", e);
    const exist = cart.find((pro) => pro._id === e._id)
    if (exist.QuantityChoosen === 1) {
      setCart(cart.filter((item) => item._id !== e._id))
    }
    else {
      setCart(cart.map((item) => (item._id === e._id) ? {...exist, QuantityChoosen: parseInt(exist.QuantityChoosen) - 1} : item))
    }
  }

  const setCheckbox = (e) => {
    setCart(cart.map((item) => (item._id === e._id) ? {...item, Checkbox: !!!item.Checkbox} : item));
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }


  const descriptionSave = (e, val) => {
    console.log("Desc=========", val)
    setCart(cart.map((item) => (item._id === e._id) ? {...item, CheckboxDesc: val} : item));
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }

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
        Order: addCartLocalStorage,
        TotalPrice: totalPrice,
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
                <AddCartProduct key={product._id} product={product} incQuantity={incQuantity} decQuantity={decQuantity}
                                descriptionSave={descriptionSave} setCheckbox={setCheckbox}/>
              )
            })}
          </div>
          {totalPrice ? <h4>Price = {totalPrice}</h4> : "No products in cart"}
          {totalPrice ? <button onClick={goToPurchase}>Checkout</button> : " Add items"}
        </div>
      }
    </div>
  )
}

export default AddCart
