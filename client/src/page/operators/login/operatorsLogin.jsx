import React, { useEffect, useRef } from "react";
import { SignIn, useUser, useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const OperatorAuth = () => {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && user) {
      const role = user.unsafeMetadata?.role;
      if (role === "operator") {
        navigate("/operator/dashboard");
      } else {
        navigate("/");
      }

      // Start signout timer (does NOT reset on activity)
      timeoutRef.current = setTimeout(async () => {
        await signOut();
        navigate("/login");
      }, SESSION_TIMEOUT);
    }

    // Cleanup timer on unmount or logout
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isSignedIn, user, navigate, signOut]);

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
