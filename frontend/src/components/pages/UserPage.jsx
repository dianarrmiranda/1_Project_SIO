import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../layout/Navbar";

import { fetchData } from "../../utils";
import Footer from "../layout/Footer";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      const data = await fetchData(`/user/view?id=${id}`);
      setUser(data);
    };
    initialize();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleChangePass = async (event) => {
    event.preventDefault();

    if (password === newPassword) {
      try {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("newPassword", password);

        const res = await fetch(
          "http://localhost:8080/user/updatePassword",
          {
            method: "POST",
            body: formData,
          }
        ).then(
          response => response.json(),
          error => console.log('An error occurred.', error)
        ).then(
          res => console.log(res)
        );  
        const data = await res;
      } catch (error) {
        console.error("Error during API call", error);
      }
    }
  };

  const handleViewDetails = (purchase) => {
    setSelectedOrder(purchase.items);
    document.getElementById("modal_viewDetails").showModal();
  };  

  console.log("User ->", user);

  return (
    <div>
      <Navbar />

      <div className="flex flex-wrap mx-[5%]">
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
          <p className="text-lg mb-2">{user.email}</p>

          <div className="flex">
            <button
              className="btn btn-accent mb-2 mr-2"
              onClick={() =>
                document.getElementById("modal_ChangePass").showModal()
              }
            >
              Change Password
            </button>
            <button className="btn btn-accent mb-2" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="avatar">
          <div className="w-40 rounded mr">
            <img
              src={"../../" + user.image}
              alt="User Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4">
          <h2 className="text-2xl font-bold mt-4 mb-2">My orders</h2>
          {user.request_History.length === 0 ? (
            <p>No purchases done yet</p>
          ) : (
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>State</th>
                  <th>Total Spent</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {user.request_History.map((purchase) => (
                  <tr key={purchase.id}>
                    <td>{purchase.id}</td>
                    <td>Delivered</td>
                    <td>{purchase.total}€</td>
                    <td>
                      <button 
                        className="btn btn-accent"
                        onClick={() => handleViewDetails(purchase)}
                      >View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
      <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
        <Footer />
      </div>

      <dialog id="modal_ChangePass" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Change Password!</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Confirm New Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="modal-action flex">
            <form method="dialog">
              <button
                className="btn btn-primary mr-2"
                onClick={handleChangePass}
              >
                Submit
              </button>
            </form>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="modal_viewDetails" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Order Details</h3>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder?.map((item) => (
                <tr key={item.id}>
                  <td>{item.prod.name}</td>
                  <td>{item.prod.price}€</td>
                  <td>{item.quantity}</td>
                  <td>{item.prod.price * item.quantity}€</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="modal-action flex">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      
    </div>
  );
};

export default ProductPage;
