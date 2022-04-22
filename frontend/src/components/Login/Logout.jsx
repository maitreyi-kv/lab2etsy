import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {logoutAction} from '../../actions';


const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const login = useSelector(state => state.login);

  useEffect(() => {
    return () => {
      localStorage.removeItem("jwt");
      dispatch(logoutAction());
      console.log("Token after del", login);
      navigate('/home');
    };
  }, [login]);


  return (
    <div>
      Logging out
    </div>
  )
}

export default Logout;


