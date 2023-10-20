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

        const response = await fetch(
          "http://localhost:8080/user/updatePassword",
          {
            method: "POST",
            body: formData,
          }
        );  
        const data = await response;
        console.log(data);
      } catch (error) {
        console.error("Error during API call", error);
      }
    }
  };

  console.log("User ->", user);

  return (
    <div>
      <Navbar />

      <div className="flex flex-wrap">
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
    </div>
  );
};

export default ProductPage;
