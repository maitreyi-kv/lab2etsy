import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function Product() {
  let params = useParams();
  let productID = params.productId;
  const [product, setProduct] = useState([]);
  const [fav, setFav] = useState(null);
  const [quan, setQuan] = useState(null);
  const login = useSelector(state => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Login", login)
    const fetchProduct = async () => {
      const config = {
        method: 'get',
        url: `http://localhost:3001/product/${productID}`,
        headers: login ? {Authorization: login} : {}
      };

      console.log("URL", config);
      const resp = await axios(config);
      setProduct(resp.data);
      setFav(resp.data.isFavorite);
      console.log("Productss", product)
      return resp.data;
    }

    fetchProduct().then(r => console.log("In Get Product by ID", r, product)).catch(err => console.log("Error in" +
      " Products" +
      " useEffect", err));

  }, [productID]);

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

  const goToShop = () => {
    let sName = product.ShopName;
    navigate(`/shophome?name=${sName}`);
  }

  const addToCart = () => {
    let current = [];
    //TODO: Add validations here for min max - use this variable QuantityAvailable
    if ("cartItems" in localStorage) {
      current = JSON.parse(localStorage.getItem("cartItems"));
    }
    current.push({...product, QuantityChoosen: Number.parseInt(quan)})
    localStorage.setItem("cartItems", JSON.stringify(current))
  }

  return (
    <div>
      {product &&
        <div>
          <div>
            <img src={product.ImageURL} className='img-fluid'
                 alt="alt text" height="200px"/>
          </div>
          <div>
            <button onClick={goToShop}>{product.ShopName}</button>
            <h6>{product.Price}</h6>
            <h6>{product.Name}</h6>
            <h6>{product._id}</h6>
            {login ? fav ? <FavoriteIcon onClick={favToggle}/> : <FavoriteBorderIcon onClick={favToggle}/> :
              <FavoriteBorderIcon/>}
            <br/>
            <input type="number" min="0" onChange={(e) => setQuan(e.target.value)}/>
            <button type="submit" onClick={addToCart}>Add To Cart</button>
          </div>
        </div>
      }
    </div>
  )
}
