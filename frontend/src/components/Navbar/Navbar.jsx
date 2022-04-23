import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import {IconButton, Typography} from '@mui/material';
import './Navbar.css';


export const Navbar = () => {
    const [searchText, setSearchText] = useState("");
    const login = useSelector(state => state.login);

    let navigate = useNavigate();

    const onChangeText = event => {
        setSearchText(event.target.value)
    };

    const search = () => {
        navigate("/home?search="+searchText)
    }

    const resetText = () => {
        setSearchText("")
    }

    return (
        <div>
            <Typography variant="h6" component="h6">
                <ul>
                    {/*<li>Etsy</li>*/}
                    <li onClick={resetText}><Link to="/home">Etsy</Link></li>
                    <li className="search-bar-li">
                        <input type="text" name="name" className="search-bar" value={searchText} onChange={onChangeText}/>
                    </li>
                    <li style={{ paddingTop: '10px', width: "5%" }}>
                        <IconButton aria-label="Favorite" onClick={() => search()}>
                            <SearchIcon style={{ fill:"grey"} }/>
                        </IconButton>
                    </li>
                    { !login ? <li><Link to="/login">Login</Link></li> : '' }
                    { !login ? <li><Link to="/register">Register</Link></li> : ''}
                    { login ? <li><Link to="/favorites">Favorites</Link></li> : '' }
                    { login ? <li className="right"><Link to="/shop">Shop</Link></li> : '' }
                    { login ? <li><Link to="/logout">Logout</Link></li> : ''}

                    {/*{ isLogged ? <li className="mimic" onClick={logoutFunc}>Logout</li> : <li className="right"><Link to="/login">Login</Link></li> }*/}
                    {/*{ isLogged ? <li className="right"><Link to="/profile">Profile</Link></li> : '' }*/}

                    {/*{ isLogged ? <li className="right"><Link to="/favorite">Fav</Link></li> : '' }*/}
                    {/*{ (isLogged !== true) ? <li className="right"><Link to="/register">Register</Link></li> : '' }*/}
                    {/*<li onClick={resetText}><Link to="/addToCart">*/}
                    {/*    <IconButton aria-label="addCart">*/}
                    {/*        <ShoppingCartIcon style={{ fill:"grey"} }/>*/}
                    {/*    </IconButton>*/}
                    {/*</Link></li>*/}

                </ul>
            </Typography>
            <hr style={{ borderTop: "gray" }}/>
        </div>
    )
}
