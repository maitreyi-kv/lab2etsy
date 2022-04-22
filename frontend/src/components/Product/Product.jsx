import {useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';

export default function Product() {
  let params = useParams();
  let productID = Number.parseInt(params.productId);
  const [product, setProduct] = useState([]);
  const login = useSelector(state => state.login);

  useEffect(() => {

    const fetchProduct = async () => {
      const config = {
        method: 'get',
        url: `http://localhost:3001/product/${productID}`,
        headers: login ? { Authorization: login } : {}
      };

      console.log("URL", config);
      const resp = await axios(config);
      setProduct(resp.data);
      return resp.data;
    }

    fetchProduct().then(r => console.log("In Get Product by ID", r, product)).catch(err => console.log("Error in" +
        " Products" +
        " useEffect", err));

  }, [productID]);
  // console.log(params.productId);
  // let {Name, Price} = getInvoice(Number.parseInt(params.productId));
  // console.log("Invoice===", Number.parseInt(params.productId));

  return (
    <div>
        {product &&
            <div>
              <h6>{product.Price}</h6>
              <h6>{product.Name}</h6>
              <h6>{product._id
              }</h6>
            </div>
        }
    </div>
)
}
