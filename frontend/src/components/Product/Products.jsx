import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import ProductDashboard from './ProductDashboard';
import {URL} from '../../constants';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchParamsVal, setSearchParamsVal] = useState(null);
  console.log("Search parmas", searchParams.get("search"))
  const [products, setProducts] = useState([]);
  const [checkbox, setCheckbox] = useState(false);
  const [sortBy, setSortBy] = useState([]);
  const login = useSelector(state => state.login);

  useEffect(() => {
    //TODO: Paste the Checkbox
  }, [checkbox])

  useEffect(() => {
    //TODO: Paste the SortBy
  }, [sortBy])

  useEffect(() => {

    const fetchProducts = async () => {
      console.log("Search etxt", searchParams)
      const config = {
        method: 'get',
        url: `${URL}/products`,
        headers: login ? {Authorization: login} : {}
      };

      console.log("Products", config);
      let searchText = searchParams.get("search");
      if (searchText) {
        setSearchParamsVal(searchText);
        config.url += `?search=${searchText}`;
      }

      console.log("URL", config.url);
      const resp = await axios(config);
      console.log("Products===", resp.data);
      setProducts(resp.data);
      return resp.data;
    }

    fetchProducts().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));
  }, [searchParams]);

  const favToggle = (product, action) => {
    console.log("In toggle============", product, action)
    if (login) {
      const toggleFav = async () => {
        const config = {
          method: 'post',
          url: `${URL}/favorite/`,
          headers: {Authorization: login},
          data: {productID: product._id, action: action}
        };

        console.log("URL", config);
        const resp = await axios(config);
        console.log("Response fav", resp);
        return resp;
      }

      setProducts(products.map((item) => (item._id === product._id) ? {...product, isFavorite: action } : item))

      toggleFav().then(r => console.log("Fav posted")).catch(err => console.log("Error in Fav" + err));
    }
  }

  return (
    <div>
      <div style={{float: "left", paddingTop: "50px"}}>
        {searchParamsVal ?
          <div style={{paddingLeft: "40px"}}>
            <label style={{float: "right", width: "30%"}} htmlFor="min">Min</label>
            <input style={{float: "right", width: "10%"}} type="number" id="min" onChange={() => setCheckbox(!checkbox)}/>
            <label style={{float: "right", width: "30%"}} htmlFor="max">Max</label>
            <input style={{float: "right", width: "10%"}} type="number" id="max" onChange={() => setCheckbox(!checkbox)}/>
          </div> : ''
        }
      </div>
      <div style={{float: "right", marginRight: "100px"}}>
        {searchParamsVal ?
          <div style={{paddingLeft: "40px"}}>
            <label style={{float: "right", width: "30%"}} htmlFor="checker">Ignore Sold Out</label>
            <input style={{float: "right", width: "30%"}} type="checkbox" id="checker" checked={checkbox}
                   onChange={() => setCheckbox(!checkbox)}/>
          </div> : ''
        }
        {searchParamsVal ?
          <div>
            <select style={{float: "right", padding: "10px"}} value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}>
              <option value="price">Price</option>
              <option value="Quality">Quality</option>
              <option value="SalesCount">Sales Count</option>
            </select>
          </div> : ''
        }
      </div>
      <div style={{float: "left"}}>
        <div style={{display: "flex", flexWrap: "wrap", marginLeft: "120px"}}>
          {products.map((product) => {
            return (
              <ProductDashboard product={product} favToggle={favToggle}/>
            )
          })}
        </div>
      </div>
    </div>
  )
}
