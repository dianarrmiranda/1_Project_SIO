const stock = [
  { id: 0, status: 'In Stock' },
  { id: 1, status: 'Available by encomend' },
  { id: 2, status: 'Out of Stock' },
  { id: 3, status: 'Unavailable' },
];

const Filter = ({ categories }) => {
  return (
    <form className="bg-secondary shadow-xl rounded-xl m-2 p-2">
      <div className="flex flex-col">
        <div className="divider">Preço</div>
        <div className="flex flex-wrap justify-evenly">
          <input
            type="text"
            className="input input-sm input-white w-[40%] text-center"
            placeholder="0"
            name="min"
          />
          -
          <input
            type="text"
            className="input input-sm input-white w-[40%] text-center"
            placeholder="100"
            name="max"
          />
        </div>
      </div>
      <div className="divider">Categoria</div>
      <div className="flex flex-wrap justify-start">
        {categories?.map((cat) => (
          <span className="m-1">
            <input
              id={`cat-${cat.id}`}
              key={cat.id}
              type="checkbox"
              value={cat.id}
              className="checkbox checkbox-sm checkbox-accent align-middle"
              placeholder="lol"
              name="category"
            />
            <label
              className="p-1"
              htmlFor={`cat-${cat.id}`}
            >
              {cat.nome}
            </label>
          </span>
        ))}
      </div>
      <div className="divider">Stock</div>
      <div className="flex flex-wrap justify-start">
        {stock?.map((s) => (
          <span className="m-1">
            <input
              id={`status-${s.id}`}
              key={s.id}
              type="checkbox"
              value={s.id}
              className="checkbox checkbox-sm checkbox-accent align-middle"
              placeholder="lol"
              name="stock"
            />
            <label
              className="p-1"
              htmlFor={`status-${s.id}`}
            >
              {s.status}
            </label>
          </span>
        ))}
      </div>
      <button
        type="submit"
        className="btn btn-accent btn-sm w-full p-2 mt-4 "
        value="Submit"
      >
        APPLY
      </button>
    </form>
  );
};

export default Filter;
