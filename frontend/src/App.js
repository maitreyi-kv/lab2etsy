import Products from './components/Product/Products';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from './components/Product/Product';
import {Navbar} from './components/Navbar/Navbar';
import imageUpload from './components/ImageUpload';
import ImageUpload from './components/ImageUpload';
import {Footer} from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/home" element={<Products/>}/>
          <Route path="/image" element={<ImageUpload/>}/>
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
