import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import axios from 'axios';
import ProductDashboard from './Product/ProductDashboard';
import {IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Favorites() {
  const [products, setProducts] = useState(null);
  const login = useSelector(state => state.login);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {

    const fetchProducts = async () => {
      const config = {
        method: 'get',
        url: `${URL}/products/favorite`,
        headers: login ? {Authorization: login} : {}
      };

      console.log("URL", config.url);
      const resp = await axios(config);
      console.log("Products===", resp.data);
      setProducts(resp.data);
      return resp.data;
    }

    fetchProducts().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));
  }, []);

  const search = () => {
    console.log("Searching", searchText)
    if(searchText.trim()) {
      const filterProducts = async () => {
        const config = {
          method: 'get',
          url: `${URL}/products/favorite?search=` + searchText,
          headers: login ? {Authorization: login} : {}
        };

        console.log("URL", config.url);
        const resp = await axios(config);
        console.log("Favorites with search===", resp.data);
        setProducts(resp.data);
        return resp.data;
      }

      filterProducts().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));
    }
  }

  const onChangeText = event => {
    setSearchText(event.target.value)
  };

  return (
    <div>
      {products &&
        <div>
          <input type="text" name="name" className="search-bar" value={searchText} onChange={onChangeText}/>
          <IconButton aria-label="Favorite" onClick={() => search()}>
          <SearchIcon style={{ fill:"grey"} }/>
        </IconButton>
        <div style={{display: "flex", flexWrap: "wrap"}}>
          {products.map((product) => {
            return (
              <ProductDashboard product={product}/>
            )
          })}

        </div>
        </div>
      }
    </div>
  )
}

export default Favorites
