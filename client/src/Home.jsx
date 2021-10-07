import style from "./App.module.css";
const Home = () => {
  return (
    <div className={style.mainContainer}>
      <div id="carouselExampleControls" class="carousel" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100 p-0 rounded-0"
              src="./images/slider.jpg"
              alt="First slide"
            />
          </div>
        </div>
      </div>
      <div className="heading m-xl-1 p-5">
        <h5 className="display-4 text-center">
          Get Ready for the most amazing fall collection!
        </h5>
      </div>
    </div>
  );
};
export default Home;
