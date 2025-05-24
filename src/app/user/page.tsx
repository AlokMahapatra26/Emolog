import React from 'react';
import { getUser } from '@/auth/server';
import LogoutButton from '@/components/LogoutButton';

export default async function User() {
  const user = await getUser();

  return (
    <div className="p-6 max-w-xl mx-auto rounded-2xl shadow-md bg-white dark:bg-zinc-900">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">User Profile</h2>
      
      <div className="space-y-2">
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium text-gray-900 dark:text-white">Display Name:</span> {user?.user_metadata.displayName || 'Not provided'}
        </p>
        
        <p className="text-gray-700 dark:text-gray-300">
          <span className="font-medium text-gray-900 dark:text-white">Email:</span> {user?.email || 'Not provided'}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          Logout : <LogoutButton/>
        </p>
      </div>
    </div>
  );
}
