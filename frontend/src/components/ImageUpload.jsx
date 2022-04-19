import {Link, useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function ImageUpload() {
    const [selectedFile, setSelectedFile] = useState("");
    // const [searchParams, setSearchParams] = useSearchParams();
    // // searchParams.get("text")
    // console.log("Search parmas", searchParams.get("search"))
    // const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [postsPerPage, setPostsPerPage] = useState(10);
    //
    // useEffect(() => {
    //
    //     const fetchProducts = async () => {
    //         setLoading(true);
    //         console.log("Search etxt", searchParams)
    //         const config = {
    //             method: 'get',
    //             url: 'http://localhost:3001/products',
    //             headers: {}
    //         };
    //
    //         let searchText = searchParams.get("search");
    //         if(searchText) {
    //             config.url += `?search=${searchText}`;
    //         }
    //
    //         console.log("URL", config.url);
    //         const resp = await axios(config);
    //         console.log("Products===", resp.data);
    //         setProducts(resp.data);
    //         setLoading(false);
    //         return resp.data;
    //     }
    //
    //     fetchProducts().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));
    // }, [searchParams]);

    const uplaodImage = (event) => {
        event.preventDefault();
        console.log("Submiutted Image", selectedFile)
    }

    return (
        <div style={{display: "flex", flexWrap: "wrap"}}>
            <form id="formImage" onSubmit={uplaodImage}>
                <input id="imageInput" type="file" accept="image/*"
                       onChange={(e) => setSelectedFile(e.target.files[0])}/>
                <button type="submit">Uplaod Image</button>
            </form>
        </div>
    )
}
