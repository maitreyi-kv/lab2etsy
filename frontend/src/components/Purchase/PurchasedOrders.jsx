import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";

function PurchasedOrders({order}) {
  const login = useSelector(state => state.login);
  const currency = useSelector(state => state.currency);

  return (
    <div>
      {
        //TODO: Make a order ID or combo of 2 keys - UserID + idx and use it here
        order.order.map((product, idx) => (
          <div>
            <h6>Order IDX {idx}</h6>
            <h6>{product.ShopName}</h6>
            <h6>{product.Name}</h6>
            <h6>{product.QuantityChoosen}</h6>
            <h6>{product.Price}</h6>
            <img src={product.ImageURL}/>
          </div>
        ))
      }
    </div>
  )
}

export default PurchasedOrders