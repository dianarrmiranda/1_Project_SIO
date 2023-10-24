import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { fetchData, getUrlParams } from "../../utils";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import ProductCard from "../layout/ProductCard";
import Filter from "../layout/Filter";
import axios from "axios";

const StorePage = () => {
  const navigate = useNavigate();
  const search_query = getUrlParams().get("search");
  const minPrice = getUrlParams().get("min");
  const maxPrice = getUrlParams().get("max");
  const catFilter = getUrlParams().getAll("category");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isLoading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0.0);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [origin, setOrigin] = useState("");
  const [stock, setStock] = useState(0);
  const [newCategory, setNewCategory] = useState("");

  const [addCategory, setAddCategory] = useState(false);
  const [catDescription, setCatDescription] = useState("");

  useEffect(() => {
    const initialize = async () => {
      const data_products = await fetchData("/product/list");
      const data_categories = await fetchData("/product/category/list");

      if (data_products && data_categories) {
        setLoading(false);
      }
      setProducts(data_products);
      setCategories(data_categories);
    };

    initialize();
  }, []);

  useEffect(() => {
    if (search_query) {
      document.getElementById("show_query_results").innerHTML = search_query;
      products.forEach((product) => {
        if (product.name.toLowerCase().includes(search_query.toLowerCase())) {
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      });
    }
  }, []);

  const [role, setRole] = useState("");

  useEffect(() => {
    const initialize = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        const { id, token } = user;
        const data = await fetchData(`/user/view?id=${id}&token=${token}`);
        setRole(data.role);
      }
    };
    initialize();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const { id, token } = user;
    if (addCategory) {
      const formData = new FormData();
      formData.append("name", newCategory);
      formData.append("description", catDescription);
      formData.append("userID", id);
      formData.append("token", token);

      axios
        .post("http://localhost:8080/product/category/add", formData)
        .then((res) => {
          console.log(res);
        })
        .catch(console.error);
    }

    const formData2 = new FormData();
    formData2.append("name", name);
    formData2.append("description", description);
    formData2.append("img", image);
    formData2.append("origin", origin);
    formData2.append("price", price);
    formData2.append("in_stock", stock);
    if (addCategory) {
      console.log("categories.length -> ", (categories.length + 1).toString());

      formData2.append("category", (categories.length + 1).toString());
    } else {
      formData2.append("category", category);
    }
    formData2.append("userID", id);
    formData2.append("token", token);

    axios
      .post("http://localhost:8080/product/add", formData2)
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);

    document.getElementById("modal_AddProduct").close();

    const initialize = async () => {
      const data_products = await fetchData("/product/list");
      const data_categories = await fetchData("/product/category/list");

      if (data_products && data_categories) {
        setLoading(false);
      }
      setProducts(data_products);
      setCategories(data_categories);
    };

    initialize();
  };

  useEffect(() => {
    console.log("Products -> ", products);
    console.log("Categories -> ", categories);
  }, []);

  return (
    <div>
      <Navbar />
      {search_query && (
        <div className=" bg-accent mx-[5%] m-2 p-4 rounded-xl  ">
          {notFound ? (
            <h1>
              Your search <b className="font-extrabold">{search_query}</b> did
              not generated any results{" "}
            </h1>
          ) : (
            <h3>
              You've searched for:{" "}
              <span className="font-extrabold" id="show_query_results"></span>
            </h3>
          )}
        </div>
      )}
      <div className="flex justify-between mx-[5%]">
        <div className="w-[20vw] flex-none">
          <Filter
            categories={categories}
            minPrice={minPrice}
            maxPrice={maxPrice}
            categoryFilter={catFilter}
          />
          {role === "admin" && (
            <div className="w-[20vw] flex-none">
              <button
                className="btn btn-accent w-full"
                onClick={() =>
                  document.getElementById("modal_AddProduct").showModal()
                }
              >
                Add Product
              </button>
            </div>
          )}
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        ) : notFound ? (
          <div className="justify-center w-full h-full m-48">
            <h1 className="text-center text-xl font-bold">No products found</h1>
          </div>
        ) : (
          <div className="flex flex-wrap justify-start">
            {products
              .filter((product) => {
                let found = false;
                if (search_query) {
                  return product.name
                    .toLowerCase()
                    .includes(search_query.toLowerCase());
                }
                return true;
              })
              .filter((product) => {
                if (minPrice && maxPrice) {
                  return (
                    parseFloat(product.price) >= minPrice &&
                    parseFloat(product.price) <= maxPrice
                  );
                }
                if (minPrice) {
                  return parseFloat(product.price) >= minPrice;
                }
                if (maxPrice) {
                  return parseFloat(product.price) <= maxPrice;
                }
                return true;
              })
              .filter((product) => {
                if (catFilter.length > 0) {
                  return catFilter.includes(product.categoryID);
                }
                return true;
              })
              .map((product) => (
                <ProductCard key={product.id} product={product} isStore />
              ))}
          </div>
        )}
      </div>

      <Footer />
      <dialog id="modal_AddProduct" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Product!</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <input
              type="text"
              placeholder="description"
              className="input input-bordered"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Origin</span>
            </label>
            <input
              type="text"
              placeholder="description"
              className="input input-bordered"
              required
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              placeholder="price"
              className="input input-bordered"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">stock</span>
            </label>
            <input
              type="number"
              placeholder="stock"
              className="input input-bordered"
              required
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered w-full"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={-1}
            >
              <option disabled="disabled" key={-1}>
                Choose Category
              </option>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  onClick={() => setAddCategory(false)}
                >
                  {category.nome}
                </option>
              ))}
              <option value="" onClick={() => setAddCategory(true)}>
                + Add Category
              </option>
            </select>
            {addCategory && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Category Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  required
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category Description</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Description"
                    className="input input-bordered"
                    required
                    value={catDescription}
                    onChange={(e) => setCatDescription(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              placeholder="image"
              className="input input-bordered"
              required
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            className="btn btn-accent btn-sm w-full p-2 mt-4 "
            onClick={handleSubmit}
          >
            Add Product
          </button>
          <button
            className="btn btn-error btn-sm w-full p-2 mt-4 "
            onClick={() => document.getElementById("modal_AddProduct").close()}
          >
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default StorePage;
