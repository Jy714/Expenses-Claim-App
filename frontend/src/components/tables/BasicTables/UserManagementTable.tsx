import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  gender: "男" | "女";
  phone: string;
  role: "员工" | "经理" | "财务" | "管理员";
  createdAt: string;
  updatedAt: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "王小明",
    email: "xiaoming.wang@example.com",
    gender: "男",
    phone: "012-3456789",
    role: "员工",
    createdAt: "2024-01-05 09:00",
    updatedAt: "2024-06-30 14:20",
  },
  {
    id: 2,
    name: "李小花",
    email: "xiaohua.li@example.com",
    gender: "女",
    phone: "013-2345678",
    role: "经理",
    createdAt: "2023-11-20 08:30",
    updatedAt: "2024-06-25 12:10",
  },
  {
    id: 3,
    name: "陈大文",
    email: "dawen.chen@example.com",
    gender: "男",
    phone: "014-1234567",
    role: "财务",
    createdAt: "2024-02-15 11:45",
    updatedAt: "2024-06-28 17:00",
  },
  {
    id: 4,
    name: "林美玲",
    email: "meiling.lin@example.com",
    gender: "女",
    phone: "015-5678123",
    role: "管理员",
    createdAt: "2024-03-01 10:00",
    updatedAt: "2024-06-27 09:40",
  },
  {
    id: 5,
    name: "黄志强",
    email: "zq.huang@example.com",
    gender: "男",
    phone: "016-4455667",
    role: "员工",
    createdAt: "2024-04-10 13:20",
    updatedAt: "2024-06-29 18:25",
  },
];

export default function UserManagementTable() {
  const [users] = useState<User[]>(mockUsers);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");

  return (
    <div className="p-6 bg-white rounded-xl shadow">
      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 items-center mb-4">
        <span>Name</span>
        <input
          type="text"
          placeholder="Enter username"
          className="border px-3 py-2 rounded w-48"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <span>Gender</span>
        <select
          className="border px-3 py-2 rounded w-36 cursor-pointer"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Options</option>
          <option value="男">男</option>
          <option value="女">女</option>
        </select>

        <span>Role</span>
        <select
          className="border px-3 py-2 rounded w-36 cursor-pointer"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Options</option>
          <option value="员工">Employee</option>
          <option value="经理">Manager</option>
          <option value="财务">Finance</option>
          <option value="管理员">Admin</option>
        </select>

        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          onClick={() => {
            setName("");
            setGender("");
            setRole("");
          }}
        >
          Clear
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-3">
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Delete Employee
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + Add Employee
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">
                <input type="checkbox" />
              </th>
              <th className="p-3">Id</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Gender</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Created Time</th>
              <th className="p-3">Updated Time</th>
              <th className="p-3">Operation</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={10} className="p-6 text-center text-gray-400">
                  No Records
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <input type="checkbox" />
                  </td>
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.gender}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3">{user.createdAt}</td>
                  <td className="p-3">{user.updatedAt}</td>
                  <td className="p-3 space-x-2">
                    <button className="text-blue-600 hover:underline">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-500">Total: {users.length} rows</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-blue-500 text-white"
                  : "border text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-2 text-gray-400">...</span>
          <button className="border px-3 py-1 rounded text-gray-700 hover:bg-gray-100">
            20
          </button>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            className="border px-2 py-1 w-16 rounded"
          />
          Page
        </div>
      </div>
    </div>
  );
}
