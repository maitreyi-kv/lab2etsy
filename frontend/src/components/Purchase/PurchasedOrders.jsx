import React from 'react'
import {useSelector} from 'react-redux';

function PurchasedOrders({order}) {
  const login = useSelector(state => state.login);
  const currency = useSelector(state => state.currency);

  return (
    <div>
      {
        //TODO: Make a order ID or combo of 2 keys - UserID + idx and use it here
        order.order.map((product, idx) => (
          <div>
            <h6>ShopName {product.ShopName}</h6>
            <h6>Name {product.Name}</h6>
            <h6>Quantity {product.QuantityChoosen}</h6>
            <h6>Price {product.Price}</h6>
            <h6>Description {product.Description}</h6>
            <h6>Gift Description {product.CheckboxDesc}</h6>
            <h6>Checkbox {product.Checkbox}</h6>
            <img src={product.ImageURL}/>
          </div>
        ))
      }
    </div>
  )
}

export default PurchasedOrders
