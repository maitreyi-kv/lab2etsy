import React, {useState} from 'react'
import {useSelector} from 'react-redux';

function AddCartProduct({product, incQuantity, decQuantity, descriptionSave, setCheckbox}) {
  const currency = useSelector(state => state.currency);

  if (product === {}) return;

  return (
    <div key={product._id} className='bg-image hover-overlay'
         style={{minWidth: '24rem', maxWidth: '24rem', padding: '50px'}}>

      <img src={product.ImageURL} className='img-fluid'
           alt="alt text" height="200px"/>
      <div> Price {currency} {product.Price} </div>
      <div> Name {product.Name}</div>
      <div> Name {product._id}</div>
      <div> Shopname {product.ShopName}</div>
      <div> Quantity {product.QuantityChoosen}</div>
      <button onClick={() => decQuantity(product)}>-1</button>
      <button onClick={() => incQuantity(product)}>+1</button>
      <br/>

      <input type="checkbox" id="checker" checked={product.Checkbox} onChange={() => setCheckbox(product)}/>
      {product.Checkbox ? <input id="note" name="note" value={product.CheckboxDesc} onChange={(e) => descriptionSave(product, e.target.value)}/> : ''}
    </div>
  )
}

export default AddCartProduct
