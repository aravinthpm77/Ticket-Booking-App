import { Route,Routes } from "react-router-dom";
import Home from "./page/home/home";
import About from "./page/about/about";
import Ticket from "./page/ticket/ticket";

function AllRouter(){
    return(
        <Routes>
            
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/bus-ticket" element={<Ticket/>}/>
        </Routes>
    )    
}
export default AllRouter