import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import {Link} from "react-router-dom";

function ProductDashboard({product}) {
  const currency = useSelector(state => state.currency);
  const [fav, setFav] = useState(product.isFavorite);
  const login = useSelector(state => state.login);

  useEffect(() => {
    return () => {
      console.log("Fav change");
    };
  }, [fav]);


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

      toggleFav().then(r => setFav(!fav)).catch(err => console.log("Error in Fav"+ err));
    }
  }

  return (
    <div className='bg-image hover-overlay' style={{minWidth: '24rem', maxWidth: '24rem', padding: '50px'}}>
      <Link
        style={{padding: "1rem 0"}}
        to={`/product/${product._id}`}
        key={product._id}
      >
      <img src='https://etsy-clone-bucket.s3.amazonaws.com/step4.png' className='img-fluid'
           alt="alt text" height="200px"/>
      <div> Price {currency} {product.Price} </div>
      <div> Name {product.Name}</div>
      <div> Name {product._id}</div>
        { fav ? <div>Fav</div> : <div>Not fav</div> }
      </Link>
      {login ? fav ? <FavoriteIcon onClick={favToggle}/> : <FavoriteBorderIcon onClick={favToggle}/> : <FavoriteBorderIcon />}
    </div>
  )
}

export default ProductDashboard
