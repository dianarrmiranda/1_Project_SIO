import { useNavigate } from "react-router-dom"
import { useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light")

  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleTheme = (e) => {
    if (e.target.checked == checked){
      setTheme("dark")
    }
    else {
      setTheme("light")
    }
  }
  


  return (
    <div>
      <h1 className='text-xxl text-red-400'>LAND PAGE</h1>
      <button onClick={() => navigate("/store")}>GO TO STORE</button>

      <input type="checkbox" onClick={handleTheme(e)} ></input>
    </div>
  )
}

export default HomePage
