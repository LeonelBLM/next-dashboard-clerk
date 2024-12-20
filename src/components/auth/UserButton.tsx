'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function UserButton({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      router.push('/signin');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100"
      >
        <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white">
          {user.nombre[0]}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <p className="px-4 py-2 text-sm text-gray-700">{user.nombre}</p>
            <p className="px-4 py-2 text-xs text-gray-500">{user.rol.rol}</p>
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}