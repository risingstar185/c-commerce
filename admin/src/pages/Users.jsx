import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import { AuthDataContext } from "../context/AuthContext";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { serverUrl } = useContext(AuthDataContext);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/admin/users`, {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
  <div className="w-screen min-h-screen bg-gradient-to-l from-[#51b8c4] to-[#2b26ac] flex flex-col md:flex-row">
  {/* --- Navigation and Sidebar --- */}
  <Nav />
  <Sidebar />

  {/* --- Main Content --- */}
  <div className="flex-1 md:w-[82%] w-full h-full md:absolute md:right-0 px-3 sm:px-5 md:px-8 pt-24 pb-10 overflow-y-auto">
    <h1 className="text-[24px] sm:text-[30px] md:text-[40px] text-white font-semibold mb-6 text-center md:text-left">
      Registered Users
    </h1>

    {/* --- User Table --- */}
    {users.length > 0 ? (
      <div className="overflow-x-auto bg-slate-800/60 rounded-xl shadow-md">
        <table className="w-full text-white border-collapse text-sm sm:text-base">
          <thead className="bg-slate-900/70">
            <tr>
              <th className="p-3 border-b border-gray-700 text-left">#</th>
              <th className="p-3 border-b border-gray-700 text-left">Name</th>
              <th className="p-3 border-b border-gray-700 text-left">Email</th>
              <th className="p-3 border-b border-gray-700 text-left">Joined On</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-slate-700/50 transition duration-200"
              >
                <td className="p-3 border-b border-gray-700">{index + 1}</td>
                <td className="p-3 border-b border-gray-700 break-words">
                  {user.name}
                </td>
                <td className="p-3 border-b border-gray-700 break-words">
                  {user.email}
                </td>
                <td className="p-3 border-b border-gray-700">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-white/70 text-lg text-center mt-10">
        No registered users yet.
      </p>
    )}
  </div>
</div>


  );
};

export default AdminUsers;
