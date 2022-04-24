import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

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

  const favToggle = () => {
    if (login) {
      const toggleFav = async () => {
        const config = {
          method: 'post',
          url: `http://localhost:3001/favorite/`,
          headers: {Authorization: login},
          data: {productID: product._id, action: !fav}
        };

        console.log("URL", config);
        const resp = await axios(config);
        console.log("Response fav", resp);
        return resp;
      }

      toggleFav().then(r => setFav(!fav)).catch(err => console.log("Error in Fav" + err));
    }
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
      {/*{fav ? <div>Fav</div> : <div>Not fav</div>}*/}

      {/*{login ? fav ? <FavoriteIcon onClick={favToggle}/> : <FavoriteBorderIcon onClick={favToggle}/> :*/}
      {/*  <FavoriteBorderIcon/>}*/}
    </div>
  )
}

export default AddCartProduct
