import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';
import ProductTable from './ProductTable'
import {useLocation, useParams} from 'react-router-dom';
import {URL} from '../../constants';
import Button from 'react-bootstrap/Button';


export default function Products({endpoint = "product", searchTextProps = null, ignoreSoldOut = true}) {

  const [products, setProducts] = useState([])
  const userID = useSelector(state => state.authentication.userID)
  const storeID = useSelector(state => state.authentication.storeID)
  const [txt, setTxt] = useState(null);
  const [toggle, setToggle] = useState(true);

  const search = useLocation().search;
  const tt = useParams();

  useEffect(() => {
      const searchText = new URLSearchParams(search).get('text');
      setTxt(searchText)
      let endpointURL = endpoint ? endpoint : 'product'
      let config = {
        method: 'post',
        url: `${URL}:3001/${endpointURL}`,
        data: {UserID: userID, text: searchText || searchTextProps, StoreID: storeID},
        headers: {},
      };

      const getProducts = async () => {
        await axios(config)
          .then(function (response) {
            setProducts(response.data);
          })
          .catch(function (error) {
            console.log("Error", error);
          });
      }
      getProducts().then(() => console.log("Res useEffectsProducts", products))
    }, [tt, txt, searchTextProps]
  );

  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <div>
      {
        ignoreSoldOut && <Button onClick={handleToggle} style={{float: 'right'}}> Ignore Sold Out Items</Button>
      }
      <ProductTable productsList={products} toggle={toggle}/>
    </div>
  )

}
