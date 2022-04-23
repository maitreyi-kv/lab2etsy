import React, {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';
import ProductDashboard from './Product/ProductDashboard';

function Favorites() {
  const [products, setProducts] = useState(null);
  const login = useSelector(state => state.login);

  useEffect(() => {

    const fetchProducts = async () => {
      const config = {
        method: 'get',
        url: 'http://localhost:3001/products/favorite',
        headers: login ? {Authorization: login} : {}
      };

      // let searchText = searchParams.get("search");
      // if(searchText) {
      //   config.url += `?search=${searchText}`;
      // }

      console.log("URL", config.url);
      const resp = await axios(config);
      console.log("Products===", resp.data);
      setProducts(resp.data);
      return resp.data;
    }

    fetchProducts().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));
  }, []);

  return (
    <div>
      {products &&
        <div style={{display: "flex", flexWrap: "wrap"}}>
          {products.map((product) => {
            return (
              <ProductDashboard product={product}/>
            )
          })}

        </div>
      }
    </div>
  )
}

export default Favorites
