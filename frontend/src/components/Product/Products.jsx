import {getInvoices} from './ProductList';
import {Link} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Products() {

    const [products, setProducts] = useState([]);

    useEffect( () => {
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
    });

    return (
        <div style={{display: "flex"}}>
            <nav
                style={{
                    borderRight: "solid 1px",
                    padding: "1rem",
                }}
            >
                {products.map((invoice) => {
                    console.log("Invoices", invoice)
                    return (
                        <Link
                            style={{padding: "1rem 0"}}
                            to={`/product/${invoice.number}`}
                            key={invoice.number}
                        >
                            {invoice.Name}
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
