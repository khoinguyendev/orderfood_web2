import { useState } from "react";
import axios from "axios";
import { SERVER_HOST } from "../../../config/Url";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }
    try {
       await axios.put(`${SERVER_HOST}/users/change-password`, {
        currentPassword,
        newPassword,
        confirmPassword,
      });
      setMessage("Password changed successfully");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Failed to change password");
    }
  };

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-semibold dark:text-white">Đổi mật khẩu</h3>
      {message && <p className="mb-4 text-sm text-red">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current password</label>
            <input  type="password" name="current-password" id="current-password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New password</label>
            <input type="password" id="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
            <input type="password" name="confirm-password" id="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
          </div>
          <div className="col-span-6 sm:col-full">
            <button className="text-white bg-blue-700 py-2 px-2 rounded-sm" type="submit">Save all</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
