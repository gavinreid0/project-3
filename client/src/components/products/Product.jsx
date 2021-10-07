import { Outlet } from "react-router-dom";
const Product = () => {
  return (
    <div className="producst-conatainer">
      <Outlet />
    </div>
  );
};

export default Product;
