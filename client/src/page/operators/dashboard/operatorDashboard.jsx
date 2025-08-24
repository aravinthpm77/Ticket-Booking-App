import React from "react";
import { useUser } from "@clerk/clerk-react";

const OperatorDashboard = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;
  console.log("User Role:", role,1); // For debugging
  console.log(user);

  return (
    <div className="p-40">
      <h1 className="mb-6 text-3xl font-bold">Operator Dashboard</h1>
      <p>Here you can manage bus routes: create, edit, delete, update.</p>
      {/* You can add your routes table or cards here */}
    </div>
  );
};

export default OperatorDashboard;