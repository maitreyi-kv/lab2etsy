import React, {useEffect, useState} from 'react'
import ProductDashboard from '../Product/ProductDashboard';
import AddCartProduct from './AddCartProduct';

function AddCart() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    return () => {
      let pro = JSON.parse(localStorage.getItem("cartItems"));
      setCart(pro);
    };
  }, []);

  const goToPurchase = () => {
    let addCartLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
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
