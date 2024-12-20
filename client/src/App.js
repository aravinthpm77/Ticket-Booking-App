import { BrowserRouter} from "react-router-dom"
import AllRouter from "./router"
import {ToastContainer} from "react-toastify";
import Navbar from "./components/navbar/Navbar";
function App() {
  return (
    <div >
      <BrowserRouter>
          <Navbar/>
          <AllRouter/>
      </BrowserRouter>
      <ToastContainer theme='light'/>
    </div>
    
  )
}

export default App
