import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {useSelector} from 'react-redux';
import {Link, useSearchParams} from 'react-router-dom';
import ModalAddProduct from './ModalAddProduct';
import {URL} from '../../constants';
import Button from 'react-bootstrap/Button';
import ModalEditProduct from './ModalEditProduct';
import ModalEdit from './ModalEditProduct';

function ShopHome() {
  const [products, setProducts] = useState(null);
  const [edit, setEdit] = useState(false);
  const login = useSelector(state => state.login);
  const [searchParams, setSearchParams] = useSearchParams();
  const [storeName, setStoreName] = useState(searchParams.get("name"));
  const currency = useSelector(state => state.currency);
  const [user, setUser] = useState(null);

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
      setUser(resp.data.user);
      return resp.data;
    }

    fetchProducts().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));
  }, []);

  return (
    <div>
      <h2>ShopName: {storeName}</h2>
      {user &&
        <div style={{float: "right", width: "20%"}}>
          <h6>Shop Owner Details </h6>
          <h6>{user.Name} </h6>
          <h6>Country {user.Address} </h6>
          <img src={user.ImageURL} className='img-fluid' alt="alt text" width="50px"/>
        </div>

      }

      <div className="table-responsive" style={{ float: "right", width: "20%", paddingRight: "10px"}}>
        <table className="table">
          <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Sales Count</th>
          </tr>
          </thead>
          <tbody>
          {products &&
            products.map(p => (
              <tr>
                <td> {p.Name} </td>
                <td> {p.QuantitySold || 0} </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>

      {products &&
        <div>
          {edit? <Button style={{marginBottom:"10px"}} onClick={() => console.log("EDIT")}>Add Image</Button> : ''}
          { edit? <ModalAddProduct ShopName={storeName}/> : '' }
          <div style={{minWidth: '24rem', maxWidth: '24rem', padding: '50px'}}>
            {products.map((product) => {
              return (
                <div>
                  <img src={product.ImageURL||'https://etsy-clone-bucket.s3.amazonaws.com/step4.png'} className='img-fluid'
                       alt="alt text" height="200px"/>
                  <h6> Price {currency} {product.Price} </h6>
                  <h6> Name {product.Name}</h6>
                  {edit ?
                    <div><ModalEdit product={product} /></div> : ''
                  }
                </div>
              )
            })}
          </div>
        </div>
      }

    </div>
  )
}

export default ShopHome
