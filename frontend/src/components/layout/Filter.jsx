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
              id={`cbx-${cat.id}`}
              key={cat.id}
              type="checkbox"
              value={cat.id}
              className="checkbox checkbox-sm checkbox-accent align-middle"
              placeholder="lol"
              name="category"
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
      <button
        type="submit"
        className="btn btn-accent btn-sm w-full p-2 mt-4 "
            value="Submit"
>APPLY</button>
    </form>
  );
};

export default Filter;
