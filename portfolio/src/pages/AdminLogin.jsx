import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Lock } from 'lucide-react';

const inputCls = [
  'w-full px-3 py-2.5 rounded-[9px] mt-1.5',
  'bg-white/[0.04] border border-white/[0.08]',
  'text-white/80 text-[0.8rem] placeholder:text-white/18',
  'focus:outline-none focus:border-sky-400/35 transition-colors',
  'font-[Syne]',
].join(' ');

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('adminToken', data.token);
        toast.success('Login successful!');
        navigate('/admin');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch {
      toast.error('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-[#080a0f] flex items-center justify-center px-4"
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      <ToastContainer theme="dark" />

      <div className="w-full max-w-md bg-white/[0.025] border border-white/[0.07] rounded-[18px] p-9">

        {/* Icon + heading */}
        <div className="flex flex-col items-center mb-7">
          <div className="w-14 h-14 rounded-full border border-sky-400/20 bg-sky-400/[0.06] flex items-center justify-center mb-4">
            <Lock size={22} className="text-sky-400" />
          </div>
          <h1 className="text-[1.1rem] font-extrabold tracking-tight text-white/88">
            Admin Login
          </h1>
          <p className="text-[0.72rem] tracking-wide text-white/28 mt-1">
            Only authorized access allowed
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-white/32">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-[0.68rem] font-bold tracking-[0.08em] uppercase text-white/32">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={inputCls}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-[10px] bg-sky-400/10 border border-sky-400/28 text-sky-400 text-[0.76rem] font-extrabold tracking-[0.08em] hover:bg-sky-400/18 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;