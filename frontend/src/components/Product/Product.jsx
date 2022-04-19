import {useParams} from "react-router-dom";
import {getInvoice} from './ProductList';
import {Card, CardActionArea, CardContent, CardMedia, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Product() {
  let params = useParams();
  let productID = Number.parseInt(params.productId);
  const [product, setProduct] = useState([]);
  useEffect(() => {

    const fetchProduct = async () => {
      const config = {
        method: 'get',
        url: `http://localhost:3001/products/${productID}`,
        headers: {}
      };

      console.log("URL", config);
      // const resp = await axios(config);
      // setProduct(resp.data);
      // return resp.data;
    }

    fetchProduct().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));

  }, [productID]);
  console.log(params.productId);
  let {Name, Price} = getInvoice(Number.parseInt(params.productId));
  console.log("Invoice===", Number.parseInt(params.productId));

  return (
    <div>
      {/*<Card sx={{minWidth: 275}}>*/}

      {/*<CardActionArea>*/}
      {/*  <CardMedia image='https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466__340.jpg'*/}
      {/*             title={Name}*/}
      {/*  />*/}
      {/*</CardActionArea>*/}

        {Name}
    </div>
)
}
