const Caroussel = (images) => {
  return (
    <div className="carousel w-full">
      {images.map((idx) => (
        <div
          id={`slide${idx}`}
          className="carousel-item relative w-full"
          key={idx}
        >
          <img
            src={images[idx]}
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a
              href={`#slide${(idx - 1) % images?.lenght()}`}
              className="btn btn-circle"
            >
              ❮
            </a>
            <a
              href={`#slide${(idx + 1) % images?.lenght()}`}
              className="btn btn-circle"
            >
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Caroussel;
