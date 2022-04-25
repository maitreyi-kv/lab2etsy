import {useSelector} from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {Link} from "react-router-dom";

function ProductDashboard({product, favToggle}) {
  const currency = useSelector(state => state.currency);
  const login = useSelector(state => state.login);

  return (
    <div className='bg-image hover-overlay' style={{minWidth: '24rem', maxWidth: '24rem', padding: '50px'}}>
      <Link
        style={{padding: "1rem 0"}}
        to={`/product/${product._id}`}
        key={product._id}
      >
        <img src={product.ImageURL} className='img-fluid'
             alt="alt text" height="200px"/>
        <div> {product.Name}</div>
        <div> {currency} {product.Price} </div>

      </Link>
      {login ? product.isFavorite ? <FavoriteIcon onClick={() => favToggle(product, false)}/> : <FavoriteBorderIcon onClick={() => favToggle(product, true)}/> :
        <FavoriteBorderIcon/>}
    </div>
  )
}

export default ProductDashboard
