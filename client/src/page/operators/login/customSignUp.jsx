import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUserTag } from "react-icons/fa";

const CustomSignUp = () => {
  const { signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("member");
  const [error, setError] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp.create({
        emailAddress: email,
        password,
        unsafeMetadata: { role },
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      setError(err.errors ? err.errors[0].message : "Sign up failed");
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        if (role === "operator") {
          navigate("/operator/dashboard");
        } else {
          navigate("/");
        }
      } else {
        setError("Verification incomplete.");
      }
    } catch (err) {
      setError(err.errors ? err.errors[0].message : "Verification failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 via-blue-200 to-sky-300">
      <form
        onSubmit={pendingVerification ? handleVerify : handleSubmit}
        className="flex flex-col items-center w-full max-w-md px-5 py-8 mt-20 space-y-6 scale-90 bg-white shadow-2xl rounded-2xl"
      >
        <div className="flex flex-col items-center mb-2">
          <h1 className="mb-5 text-4xl font-extrabold text-sky-700">GoBus</h1>
          <h2 className="text-2xl font-extrabold text-sky-700">
            Create your account
          </h2>
          <p className="text-sm text-neutral-500">
            Sign up to book or manage bus tickets
          </p>
        </div>
        {!pendingVerification ? (
          <>
            <div className="flex flex-col w-full gap-4">
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-sky-400" />
                <input
                  className="w-full py-2 pl-10 pr-3 transition border rounded-lg border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-sky-400" />
                <input
                  className="w-full py-2 pl-10 pr-3 transition border rounded-lg border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <FaUserTag className="absolute left-3 top-3 text-sky-400" />
                <select
                  className="w-full py-2 pl-10 pr-3 transition bg-white border rounded-lg border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="member">Member</option>
                  <option value="operator">Operator</option>
                </select>
              </div>
            </div>
            {error && (
              <div className="w-full text-sm text-center text-red-600">{error}</div>
            )}
            <button className="w-full py-2 mt-2 font-semibold text-white transition rounded-lg shadow bg-sky-600 hover:bg-sky-700">
              Sign Up
            </button>

            <p className="text-sm font-normal text-neutral-500">Already have an account? <Link to="/login" className="text-sky-600">Log in</Link></p>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center w-full">
              <p className="mb-2 font-medium text-sky-700">
                A verification code has been sent to your email.
              </p>
              <input
                className="w-full px-3 py-2 transition border rounded-lg border-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            {error && (
              <div className="w-full text-sm text-center text-red-600">{error}</div>
            )}
            <button className="w-full py-2 mt-2 font-semibold text-white transition bg-green-600 rounded-lg shadow hover:bg-green-700">
              Verify Email
            </button>
          </>
        )}
        <div className="flex justify-center w-full mt-4">
          <span className="text-xs text-neutral-400">
            Powered by{" "}
            <a
              href="https://clerk.com"
              className=" text-sky-600"
            >
              GoBus
            </a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default CustomSignUp;