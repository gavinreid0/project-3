import { Link, useParams } from "react-router-dom";
import { ProductData } from "./ProductData";
import style from "../../App.module.css";

const ProductDetails = () => {
  const { productID } = useParams();
  const [{ id, name, sizes, image, details }] = ProductData.filter(
    (data) => productID === data.id
  );
  console.log(id);
  return (
    <div className={style.shoe_container}>
      <div
        className="card"
        style={{
          width: "23rem",
          height: "fit-content",
          margin: "40px auto",
        }}
      >
        <div className="d-flex justify-content-center align-item-center">
          <div className={style.circle}></div>
          <img
            className="card-img-top d-flex justify-content-center py-3 mx-5"
            src={image}
            alt={name}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text"> {details}</p>
          <div className={style.size_container}>
            {sizes.map((size) => (
              <div className={style.size}>{size}</div>
            ))}
          </div>
          <Link className="btn btn-primary" to="/products">
            Buy this one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
