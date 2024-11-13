import { Route,Routes } from "react-router-dom";
import Home from "./page/home/home";
import About from "./page/about/about";

function AllRouter(){
    return(
        <Routes>
            
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/about" element={<About/>}/>
        </Routes>
    )    
}
export default AllRouter