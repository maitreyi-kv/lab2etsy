import {Link, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
// import useStyles from './styles';

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    // searchParams.get("text")
    console.log("Search parmas", searchParams.get("search"))
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const currency = useSelector(state => state.currency);
    const login = useSelector(state => state.login);

    useEffect(() => {

        const fetchProducts = async () => {
            setLoading(true);
            console.log("Search etxt", searchParams)
            const config = {
                method: 'get',
                url: 'http://localhost:3001/products',
                headers: login ? { Authorization: login } : {}
            };

            let searchText = searchParams.get("search");
            if(searchText) {
                config.url += `?search=${searchText}`;
            }

            console.log("URL", config.url);
            const resp = await axios(config);
            console.log("Products===", resp.data);
            setProducts(resp.data);
            setLoading(false);
            return resp.data;
        }

        fetchProducts().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));
    }, [searchParams]);

    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {products.map((product) => {
                return (
                    <Link
                        style={{padding: "1rem 0"}}
                        to={`/product/${product.number}`}
                        key={product.number}
                    >
                        <div className='bg-image hover-overlay' style={{minWidth: '24rem', maxWidth: '24rem', padding: '50px'}}>
                            <img src='https://mdbootstrap.com/img/new/fluid/city/055.webp' className='img-fluid'
                                 alt="alt text" height="200px"/>
                            <div> Price {currency} {product.Price} </div>
                            <div> Name {product.Name}</div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}
