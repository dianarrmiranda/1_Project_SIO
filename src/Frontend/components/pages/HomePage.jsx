import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className='text-xxl text-red-400'>LAND PAGE</h1>
      <button onClick={() => navigate("/store")}>GO TO STORE</button>
    </div>
  )
}

export default HomePage
