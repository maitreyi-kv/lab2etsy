import Products from './components/Product/Products';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from './components/Product/Product';
import {Navbar} from './components/Navbar/Navbar';
import imageUpload from './components/ImageUpload';
import ImageUpload from './components/ImageUpload';
import {Footer} from './components/Footer/Footer';
import Register from './components/Login/Register';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/home" element={<Products/>}/>
          <Route path="/image" element={<ImageUpload/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route
            path="*"
            element={
              <main style={{padding: "1rem"}}>
                <p>There's nothing here!</p>
              </main>
            }
          />
          <Route path="/product" element={<Product/>}>
            <Route path=":productId" element={<Product/>}/>
          </Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
      {/*<Link to="/home">Home</Link>*/}
    </div>
  );
}

export default App;
