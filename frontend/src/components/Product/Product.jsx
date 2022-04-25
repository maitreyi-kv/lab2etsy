import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {URL} from '../../constants';

export default function Product() {
  let params = useParams();
  let productID = params.productId;
  const [product, setProduct] = useState([]);
  const [fav, setFav] = useState(null);
  const [quan, setQuan] = useState(null);
  const [available, setAvailable] = useState(null);
  const login = useSelector(state => state.login);
  const navigate = useNavigate();
  const currency = useSelector(state => state.currency);


  useEffect(() => {
    console.log("Login", login)
    const fetchProduct = async () => {
      const config = {
        method: 'get',
        url: `${URL}/product/${productID}`,
        headers: login ? {Authorization: login} : {}
      };

      console.log("URL", config);
      const resp = await axios(config);
      setProduct(resp.data);
      setFav(resp.data.isFavorite);
      setAvailable(resp.data.QuantityAvailable);

      console.log("Productss", product)
      return resp.data;
    }

    fetchProduct().then(r => console.log("In Get Product by ID", r, product)).catch(err => console.log("Error in" +
      " Products" +
      " useEffect", err));

  }, [productID]);

  const favToggle = () => {
    console.log("In toggle fav product")
    if (login) {
      const toggleFav = async () => {
        const config = {
          method: 'post',
          url: `${URL}/favorite/`,
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

  const goToShop = () => {
    let sName = product.ShopName;
    navigate(`/shophome?name=${sName}`);
  }

  const addToCart = () => {
    let current = [];
    console.log("Adding product")
    if ("cartItems" in localStorage) {
      current = JSON.parse(localStorage.getItem("cartItems")) || [];
    }
    current.push({...product, QuantityChoosen: Number.parseInt(quan)})
    console.log("Current", JSON.stringify(current))
    localStorage.setItem("cartItems", JSON.stringify(current))
  }

  return (
    <div style={{ marginLeft: "100px"}}>
      {product &&
        <div>
          <div style={{float: "left"}}>
            <img src={product.ImageURL} className='img-fluid'
                 alt="alt text" height="200px"/>
          </div>
          <div style={{float: "left"}}>
            <button onClick={goToShop}>{product.ShopName}</button>
            <h6>Name {product.Name}</h6>
            <h6>Sales Count {product.QuantitySold || 0}</h6>
            <h6>Price {currency} {product.Price}</h6>
            <h6>Description {product.Description}</h6>
            {login ? fav ? <FavoriteIcon onClick={favToggle}/> : <FavoriteBorderIcon onClick={favToggle}/> :
              <FavoriteBorderIcon/>}
            <br/>
            { (available > 0 ) ? <input type="number" min="0" onChange={(e) => setQuan(e.target.value)}/> : '' }
            { (available - quan >= 0) && (available > 0 )? <button type="submit" onClick={addToCart}>Add To Cart</button> : "Out of Stock"}
          </div>
        </div>
      }
    </div>
  )
}
