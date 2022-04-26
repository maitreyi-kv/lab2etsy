import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom'
import {IconButton} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import {URL} from '../../constants';
import axios from 'axios';
import ProductDashboard from '../Product/ProductDashboard';

export const Profile = () => {
  const login = useSelector(state => state.login);
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("")
  // const [phoneNumber, setPhoneNumber] = useState("")
  // const [country, setCountry] = useState("")
  // const [city, setCity] = useState("")
  // const [address, setAddress] = useState("")
  // const [ImageURL, setImageURL] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    const getProfile = async () => {
      const config = {
        method: 'get',
        url: `${URL}/user/profile`,
        headers: login ? {Authorization: login} : {}
      };

      console.log("URL", config.url);
      const resp = await axios(config);
      console.log("User Profile===", resp.data);
      setName(resp.data.Name)
      // setCity(resp.data.City)
      // setCountry(resp.data.Country)
      // setAddress(resp.data.Address)
      // setPhoneNumber(resp.data.Phone)
      // setImageURL(resp.data.ImageURL)
      return resp.data;
    }
    getProfile().then(res => console.log("Profile get", res)).catch(err => console.log("err", err));

  }, [])

  useEffect(() => {
    if (searchText === "") {
      const fetchProducts = async () => {
        let url = `${URL}/favorite`;

        const config = {
          method: 'get',
          url: url,
          headers: login ? {Authorization: login} : {}
        };

        console.log("URL", config.url);
        const resp = await axios(config);
        console.log("Products===", resp.data);
        setProducts(resp.data);
        return resp.data;
      }

      fetchProducts().then(r => console.log("Success", r)).catch(err => console.log("Error in Products useEffect", err));
    }
  }, [searchText]);

  useEffect(() => {
    setProducts(products.filter((item) => item.Name.includes(searchText)))
    console.log("Search txt", searchText);
  }, [searchText])

  const onChangeText = event => {
    setSearchText(event.target.value)
  };

  const edit = () => {
    navigate("/edit")
  }

  const favToggle = (product, action) => {
    console.log("In toggle============", product, action)
    if (login) {
      const toggleFav = async () => {
        const config = {
          method: 'post',
          url: `${URL}/favorite/`,
          headers: {Authorization: login},
          data: {productID: product._id, action: action}
        };

        console.log("URL", config);
        const resp = await axios(config);
        console.log("Response fav", resp);
        return resp;
      }

      setProducts(products.map((item) => (item._id === product._id) ? {...product, isFavorite: action} : item))

      toggleFav().then(r => console.log("Fav posted")).catch(err => console.log("Error in Fav" + err));
    }
  }

  return (
    <div style={{marginLeft: "100px"}}>

      <div>
        <div style={{float: 'left', color: '#114b7a'}}>
          <h5>Hello {name}</h5>
        </div>
        <div style={{float: 'left', paddingLeft: "20px", paddingTop: "10px"}}>
          <IconButton aria-label="Edit" onClick={() => edit()}>
            <EditIcon style={{fill: "black"}}/>
          </IconButton>
        </div>
      </div>


      <div style={{width: "30%", float: "right"}}>
        {!login ? <Navigate to="/login"/> : ''}

        <input type="text" name="name" className="search-bar" value={searchText} onChange={onChangeText}
               style={{width: "25%"}}/>
        <IconButton aria-label="Favorite" onClick={() => edit()}>
          <SearchIcon style={{fill: "black"}}/>
        </IconButton>

      </div>

      <div style={{clear: 'both'}}>
        <h2>Favorites</h2>
      </div>

      <div style={{display: "flex", marginLeft: "120px"}}>
        {products.map((product) => {
          return (
            <ProductDashboard product={product} favToggle={favToggle}/>
          )
        })}
      </div>

    </div>
  )
}
