'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: '𝗛𝗼𝗺𝗲' },
    { href: '/ranking', label: '𝗥𝗮𝗻𝗸𝗶𝗻𝗴' },
    { href: '/games', label: '𝗚𝗮𝗺𝗲𝘀' },
    { href: '/profile', label: '𝗣𝗿𝗼𝗳𝗶𝗹𝗲' },
  ];

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout successful');
      router.push('/login');
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black/30 backdrop-blur-lg shadow-md border-b border-gray-700/50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand */}
        <div className="flex items-center">
          <Link href="/">
            <span className="text-xl font-bold text-white">
              𝗧𝗵𝗲𝗙𝗶𝗻𝗮𝗹𝗪𝗵𝗶𝘀𝘁𝗹𝗲
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition-colors ${
                pathname === item.href
                  ? 'text-green-400 font-semibold'
                  : 'text-white hover:text-yellow-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {/* 🔘 Logout button */}
          <button
            onClick={logout}
            className="ml-4 rounded-md  px-4 py-2 transition-colors hover:cursor-pointer flex items-center justify-center"
          >
            <img src="/images/logout.png" alt="Logout" className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-lg border-t border-gray-700/50">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-6 py-3 text-white transition-colors ${
                pathname === item.href ? 'bg-black/50 text-green-400' : 'hover:bg-black/20 hover:text-yellow-400'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          {/* 🔘 Logout for mobile */}
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="block w-full px-6 py-3 hover:cursor-pointer flex items-center justify-start"
          >
            <img src="/images/logout.png" alt="Logout" className="w-6 h-6" />
          </button>
        </div>
      )}
    </nav>
  );
}