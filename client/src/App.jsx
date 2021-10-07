import { Route, Routes } from "react-router-dom";
import { Header, Product, ProductDetails, ProductIndex } from "./components";
import Home from "./Home";
import style from "./App.module.css";

export const App = () => {
  return (
    <>
      <Header />
      <div className={style.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Product />}>
            <Route path="/" element={<ProductIndex />} />
            <Route path=":productID" element={<ProductDetails />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};
