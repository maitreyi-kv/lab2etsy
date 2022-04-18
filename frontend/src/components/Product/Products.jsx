import {getInvoices} from './ProductList';
import {Link} from "react-router-dom";
import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image'
// import useStyles from './styles';

export default function Products() {
    // const classes = useStyles();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://localhost:3001/book',
            headers: {}
        };

        let resp = axios(config)
            .then(function (response) {
                console.log("Response inside producst", JSON.stringify(response.data));
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
                return error;
            });
        resp.then(res => setProducts(res)).catch(err => console.log("Err", err))
    }, []);

    return (
        <div style={{display: "flex"}}>
            {products.map((invoice) => {
                console.log("Invoices", invoice)
                return (
                    <Link
                        style={{padding: "1rem 0"}}
                        to={`/product/${invoice.number}`}
                        key={invoice.number}
                    >
                        <div className='bg-image hover-overlay' style={{maxWidth: '24rem'}}>
                            <img src='https://mdbootstrap.com/img/new/fluid/city/055.webp' className='img-fluid'
                                 alt="alt text" height="200px"/>
                            <div> Price {invoice.Price} </div>
                            <div>{invoice.Name}</div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
