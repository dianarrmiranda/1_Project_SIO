import { useNavigate } from "react-router-dom"

import Navbar from "../layout/Navbar";

const StorePage = () => {
  const navigate = useNavigate();

  return (
    <div>
    <Navbar />
      <h1 className='text-xxl text-red-400'>STORE PAGE</h1>
      <button onClick={() => navigate("/")} >
        Go to landpage
      </button>
    </div>
  )
}

export default StorePage
