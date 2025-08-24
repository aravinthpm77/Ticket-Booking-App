import React, { useEffect } from "react";
import { SignIn, useUser } from "@clerk/clerk-react";
import { useNavigate, Link } from "react-router-dom";

const OperatorAuth = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && user) {

      const role = user.unsafeMetadata?.role;
      if (role === "operator") {
        navigate("/operator/dashboard");
      } else {
        navigate("/");
      }

    }

  }, [isSignedIn, user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
      <div className="mt-24">
        <SignIn
          path="/login"
          routing="path"
          signUpUrl="/signup"
        />
        
      </div>
    </div>
  );
};

export default OperatorAuth;
