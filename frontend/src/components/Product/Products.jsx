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
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {

        const fetchProducts = async () => {
            setLoading(true);

            const config = {
                method: 'get',
                url: 'http://localhost:3001/products',
                headers: {}
            };

            const resp = await axios(config);
            setProducts(resp.data);
            setLoading(false);
            return resp.data;
        }

        fetchProducts().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));
    }, []);

    return (
        <div style={{display: "flex"}}>
            {products.map((product) => {
                return (
                    <Link
                        style={{padding: "1rem 0"}}
                        to={`/product/${product.number}`}
                        key={product.number}
                    >
                        <div className='bg-image hover-overlay' style={{maxWidth: '24rem', padding: '50px'}}>
                            <img src='https://mdbootstrap.com/img/new/fluid/city/055.webp' className='img-fluid'
                                 alt="alt text" height="200px"/>
                            <div> Price {product.Price} </div>
                            <div> Name {product.Name}</div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
