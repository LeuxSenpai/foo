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
    { href: '/', label: 'Home' },
    { href: '/ranking', label: 'Ranking' },
    { href: '/games', label: 'Games' },
    { href: '/profile', label: 'Profile' },
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
    <nav className="fixed top-4 left-1/2 z-50 w-[90%] max-w-5xl -translate-x-1/2 rounded-full bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        {/* Brand */}
        <div className="flex items-center space-x-4">
          <Link href="/">
            <span className="text-lg md:text-xl font-bold text-white">
              THE FINAL WHISTLE
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
                  : 'text-white hover:text-green-400'
              }`}
            >
              {item.label}
            </Link>
          ))}
          {/* 🔘 Logout button */}
          <button
            onClick={logout}
            className="ml-4 rounded-lg bg-red-500/80 px-4 py-2 font-semibold text-white shadow-md transition-colors hover:bg-red-600"
          >
            Logout
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
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden rounded-b-2xl bg-white/10 backdrop-blur-md border-t border-white/20">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-3 text-white transition-colors ${
                pathname === item.href ? 'bg-white/20' : 'hover:bg-white/10'
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
            className="block w-full text-left px-4 py-3 text-white hover:bg-red-600 bg-red-500/80"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
