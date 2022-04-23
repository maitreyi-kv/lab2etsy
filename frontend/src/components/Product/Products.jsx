import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import ProductDashboard from './ProductDashboard';

export default function Products() {
    const [searchParams, setSearchParams] = useSearchParams();
    console.log("Search parmas", searchParams.get("search"))
    const [products, setProducts] = useState([]);
    const login = useSelector(state => state.login);

    useEffect(() => {

        const fetchProducts = async () => {
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
            return resp.data;
        }

        fetchProducts().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));
    }, [searchParams]);

    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            {products.map((product) => {
                return (
                        <ProductDashboard product={product} />
                )
            })}
        </div>
    )
}
