import { useNavigate } from "react-router-dom"

const StorePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className='text-xxl text-red-400'>STORE PAGE</h1>
      <button onClick={() => navigate("/")} >
        Go to landpage
      </button>
    </div>
  )
}

export default StorePage
