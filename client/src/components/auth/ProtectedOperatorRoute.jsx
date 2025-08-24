import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import WarningMessage from "../alertmessage/warningmessage";
import { useNavigate } from "react-router-dom";

const ProtectedOperatorRoute = ({ children }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = React.useState(false);

  useEffect(() => {
    if (!isSignedIn && isLoaded) {
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
        navigate("/", { replace: true });
      }, 1500); // Show warning for 1.5 seconds before redirect
    }
  }, [isSignedIn, isLoaded, navigate]);

  if (!isSignedIn && isLoaded) {
    return showWarning ? 
    <div className="mt-40 text-xl font-bold text-center text-red-600">
      <WarningMessage message="Sign In required" />
    </div>
     : null;
  }

  if (!isLoaded) {
    return <div className="mt-20 text-center">Loading...</div>;
  }

  const isOperator = user?.unsafeMetadata?.role === "operator";
  if (!isOperator) {
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 5000);
    return <div className="mt-40 text-xl font-bold text-center text-red-600">
      
      <WarningMessage message="Access Denied: You do not have permission to view this page."/>
      Access Denied !!!
    </div>;
  }
  
  return <>{children}</>;
};

export default ProtectedOperatorRoute;
