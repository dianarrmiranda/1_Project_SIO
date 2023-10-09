const Carousel = ({ images }) => {
  
  console.log(images.lenght)
  return (
    <div className="carousel w-full">
      {images.map((url, idx) => (
        <div
          id={`slide${idx}`}
          className="carousel-item relative w-full max-h-[50vh] overflow-y-hidden"
        >
          <img
            src={url}
            className="w-full"
          />  
          <span className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={"#slide" + ((idx - 1) % 3)}
              className="btn btn-circle opacity-20 hover:opacity-100"
            >
              ❮
            </a>
            <a
              href={"#slide" + ((idx +1) % 3)}
              className="btn btn-circle opacity-20 hover:opacity-100"
            >
              ❯
            </a>
          </span>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
