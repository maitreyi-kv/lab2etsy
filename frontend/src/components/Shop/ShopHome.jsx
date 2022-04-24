import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Link, useSearchParams} from 'react-router-dom';
import ModalAddProduct from './ModalAddProduct';
import {URL} from '../../constants';

function ShopHome() {
  const [products, setProducts] = useState(null);
  const [edit, setEdit] = useState(false);
  const login = useSelector(state => state.login);
  const [searchParams, setSearchParams] = useSearchParams();
  const [storeName, setStoreName] = useState(searchParams.get("name"));
  const currency = useSelector(state => state.currency);


  useEffect(() => {
    let storeName = searchParams.get("name");

    const fetchProducts = async () => {
      const config = {
        method: 'get',
        url: `${URL}/shop/products?name=` + storeName,
        headers: login ? {Authorization: login} : {}
      };

      console.log("URL", config.url);
      const resp = await axios(config);
      console.log("Products===", resp.data);
      setProducts(resp.data.products);
      setEdit(resp.data.canEdit);
      return resp.data;
    }

    fetchProducts().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));
  }, []);

  return (
    <div>
      <h2>ShopName: {storeName}</h2>

      {products &&
        <div>
          {/*TODO: Add image and upload to s3*/}
          {edit? <button onClick={() => console.log("EDIT")}>Add Image</button> : ''}
          { edit? <ModalAddProduct ShopName={storeName}/> : '' }
          <div style={{minWidth: '24rem', maxWidth: '24rem', padding: '50px'}}>
            {products.map((product) => {
              return (
                <Link
                  style={{padding: "1rem 0"}}
                  to={`/product/${product._id}`}
                  key={product._id}
                >
                  <img src={product.ImageURL||'https://etsy-clone-bucket.s3.amazonaws.com/step4.png'} className='img-fluid'
                       alt="alt text" height="200px"/>
                  <div> Price {currency} {product.Price} </div>
                  <div> Name {product.Name}</div>
                  <div> Name {product._id}</div>
                  <div> Shopname {product.ShopName}</div>
                </Link>
              )
            })}
          </div>
          { edit? <h4>can edit</h4> : <h4>cannot edit</h4> }
        </div>
      }
    </div>
  )
}

export default ShopHome
