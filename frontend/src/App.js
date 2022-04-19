import Products from './components/Product/Products';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from './components/Product/Product';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Products/>} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/*<Link to="/home">Home</Link>*/}
    </div>
  );
}

export default App;
