import { useState } from 'react';

const stock = [
  { id: 0, status: 'In Stock' },
  { id: 1, status: 'Available by encomend' },
  { id: 2, status: 'Out of Stock' },
  { id: 3, status: 'Unavailable' },
];

const Filter = ({ categories, minPrice, maxPrice, categoryFilter }) => {
  const [min, setMin] = useState(minPrice ? minPrice : '');
  const [max, setMax] = useState(maxPrice ? maxPrice : '');
  const [catFilter, setCatFilter] = useState(
    categoryFilter.length > 0 ? categoryFilter : []
  );

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
            value={min ? min : ''}
            onChange={(e) => {
              setMin(e.target.value);
            }}
          />
          -
          <input
            type="text"
            className="input input-sm input-white w-[40%] text-center"
            placeholder="100"
            name="max"
            value={max ? max : ''}
            onChange={(e) => {
              setMax(e.target.value);
            }}
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
              checked={catFilter?.includes(cat.id.toString())}
              onChange={(e) => {
                if (e.target.checked) {
                  setCatFilter([...catFilter, e.target.value]);
                } else {
                  setCatFilter(
                    catFilter.filter((cat) => cat !== e.target.value)
                  );
                }
              }}
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
              className="p-1 w-full"
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
      <button
        className="btn btn-neutral btn-sm w-full p-2 mt-4 "
        onClick={() => {
          setMin('');
          setMax('');
          setCatFilter([]);
        }}
      >
        CLEAR
      </button>
    </form>
  );
};

export default Filter;
