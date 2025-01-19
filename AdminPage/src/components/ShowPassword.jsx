import React from 'react'
import { useState } from 'react';
// import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
function ShowPassword({ userData, handleChange }) {
    const [showPassword, setShowPassword] = useState(false);
    
  return (
    <div>
            <label htmlFor="password">Password:</label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    autoComplete="password"
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                >
                    {showPassword ? (
                        <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                        <EyeIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                </button>
            </div>
    </div>
  )
}

export default ShowPassword