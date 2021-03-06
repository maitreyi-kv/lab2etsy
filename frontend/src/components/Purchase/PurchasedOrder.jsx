import React from 'react'
import {useSelector} from 'react-redux';

function PurchasedOrder({order}) {
  const login = useSelector(state => state.login);
  const currency = useSelector(state => state.currency);

  return (
    <>
      {
        order.order.map((product, idx) => (
          <tr>
            <td>{idx+1}</td>
            <td>
              <img height="100px" src={product.ImageURL}/>
            </td>
            <td>{product.Name}</td>
            <td>{product.ShopName}</td>
            <td>{product.QuantityChoosen}</td>
            <td>{product.Price}</td>
            { product.Checkbox? <td>Gift wrap</td> : <td></td>}
            { product.CheckboxDesc ? <td>{product.CheckboxDesc}</td> : <td></td> }

          </tr>
        ))
      }
    </>
  )
}

export default PurchasedOrder
