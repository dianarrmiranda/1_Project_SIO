const Filter = ({ categories }) => {
  return (
    <form className="bg-secondary rounded-xl m-2 p-2">
      <div className="flex flex-col">
        <div className="divider">Preço</div>
        <div className="flex flex-col justify-evenly">
          <span className="flex flex-wrap justify-evenly">
            <label htmlFor="price-min">MIN</label>
            <label htmlFor="price-max">MAX</label>
          </span>
          <span className="flex flex-wrap  justify-evenly">
            <input
              id="price-max"
              type="text"
              className=" input input-xs w-[40%]"
            />
            <h1 className=" align-middle justify-center">-</h1>
            <input
              id="price-min"
              type="text"
              className=" input input-xs w-[40%]"
            />
          </span>
        </div>
      </div>
      <div className="divider">Categoria</div>
      <div className="flex flex-col">
        {categories?.map((cat) => (
          <span className="m-1">
            <input
              id={`cbx-${cat.id}`}
              key={cat.id}
              type="checkbox"
              className="checkbox checkbox-sm checkbox-accent align-middle"
              placeholder="lol"
            />
            <label
              className="p-1"
              htmlFor={`cbx-${cat.id}`}
            >
              {cat.nome}
            </label>
          </span>
        ))}
      </div>
      <button type="submit" className="btn btn-accent">APPLY</button>
    </form>
  );
};

export default Filter;
