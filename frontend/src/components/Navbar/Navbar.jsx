import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import {IconButton, Typography} from '@mui/material';
import './Navbar.css';


export const Navbar = () => {
    // const isLogged = useSelector(state => state.authentication.auth)
    // const username = useSelector(state => state.authentication.user)
    // useSelector(state => state.authentication.canRegister);
    const [searchText, setSearchText] = useState("");
    // const dispatch = useDispatch()
    let navigate = useNavigate();

    const onChangeText = event => {
        setSearchText(event.target.value)
    };

    // function logoutFunc() {
    //     localStorage.removeItem("address")
    //     // dispatch(signOut());
    //     navigate("/login")
    // }

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
                    <li>Etsy</li>
                    {/*<li onClick={resetText}><Link to="/home">Home</Link></li>*/}
                    <li className="search-bar-li">
                        <input type="text" name="name" className="search-bar" value={searchText} onChange={onChangeText}/>
                    </li>
                    <li style={{ paddingTop: '10px', width: "5%" }}>
                        <IconButton aria-label="Favorite" onClick={() => search()}>
                            <SearchIcon style={{ fill:"grey"} }/>
                        </IconButton>
                    </li>

                    {/*{ isLogged ? <li className="mimic" onClick={logoutFunc}>Logout</li> : <li className="right"><Link to="/login">Login</Link></li> }*/}
                    {/*{ isLogged ? <li className="right"><Link to="/profile">Profile</Link></li> : '' }*/}
                    {/*{ isLogged ? <li className="right"><Link to="/store">Shop</Link></li> : '' }*/}
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
