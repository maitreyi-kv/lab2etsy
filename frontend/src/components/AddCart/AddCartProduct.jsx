import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";

function AddCartProduct({product}) {
  const currency = useSelector(state => state.currency);
  const [fav, setFav] = useState(product.isFavorite);
  const login = useSelector(state => state.login);
  const [quantity, setQuantity] = useState(product.QuantityChoosen);
  const [updatePage, setUpdatePage] = useState(false);
  const [checkbox, setCheckbox] = useState(!!product.Checkbox);
  const [checkboxDescription, setCheckboxDescription] = useState(product.CheckboxDesc);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("hy lag", quantity);
    console.log("Quan change", quantity);
    let addCartLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
    if (addCartLocalStorage) {
      let updated = addCartLocalStorage.filter(localProduct => localProduct._id !== product._id);
      console.log("Updated", updated)
      if (Number.parseInt(quantity) > 0) {
        updated.push({...product, QuantityChoosen: Number.parseInt(quantity)})
      } else if(Number.parseInt(quantity) === 0) {
        console.log("Naviate zerooo")
        navigate('/addcart');
      }
      localStorage.setItem('cartItems', JSON.stringify(updated));
    }
  }, [quantity])

  const updateQuan = (e) => {
    setQuantity(e.target.value)
  }

  const descriptionSave = (e) => {
    setCheckboxDescription(e.target.value);
    let addCartLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
    if(addCartLocalStorage) {
      let updated = addCartLocalStorage.filter(localProduct => localProduct._id !== product._id);
      let newChanges = {...product, Checkbox: checkbox, CheckboxDesc: checkboxDescription}
      updated.push(newChanges);
      localStorage.setItem('cartItems', JSON.stringify(updated));
      console.log("Updated", updated)
    }
  }

  return (
    <div className='bg-image hover-overlay' style={{minWidth: '24rem', maxWidth: '24rem', padding: '50px'}}>

      <img src={product.ImageURL} className='img-fluid'
           alt="alt text" height="200px"/>
      <div> Price {currency} {product.Price} </div>
      <div> Name {product.Name}</div>
      <div> Name {product._id}</div>
      <div> Shopname {product.ShopName}</div>
      <label form="quan">Quantity</label>
      <input type="number" id="quan" value={quantity} onChange={updateQuan}/>
      <br/>
      <input type="checkbox" id="checker" checked={checkbox} onClick={() => setCheckbox(!checkbox)} />
      { checkbox ? <input id="note" name="note" onChange={descriptionSave}/> : ''}
    </div>
  )
}

export default AddCartProduct
