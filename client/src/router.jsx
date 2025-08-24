import { Route,Routes } from "react-router-dom";
import Home from "./page/home/home";
import About from "./page/about/about";
import Ticket from "./page/ticket/ticket";
import Details from "./page/ticket/detail/details";
import OperatorDashboard from "./page/operators/dashboard/operatorDashboard";
import ProtectedOperatorRoute from "./components/auth/ProtectedOperatorRoute";
import OperatorAuth from "./page/operators/login/operatorsLogin";
import CustomSignUp from "./page/operators/login/customSignUp";

function AllRouter(){
    return(
        <Routes>
            
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/about" element={<About/>}/>
            <Route exact path="/bus-ticket" element={<Ticket/>}/>
            <Route exact path="/bus-ticket/details" element={<Details/>}/>
            <Route exact path="/login" element={<OperatorAuth/>}/>
            <Route path="/signup" element={<CustomSignUp />} />
            <Route 
                exact path="/operator/dashboard" 
                element={
                    <ProtectedOperatorRoute>
                        <OperatorDashboard />
                    </ProtectedOperatorRoute>
                } 
            />
        </Routes>
    )    
}
export default AllRouter