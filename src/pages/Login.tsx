
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userAtom } from '../atoms/user';
import { TEST_USERS } from '../lib/auth.ts';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const mockToken = 'mock-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      setUser(TEST_USERS['org-admin']); // Default to org-admin
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  }

  const handleQuickLogin = (role: string) => {
    const user = TEST_USERS[role];
    if (user) {
      const mockToken = 'mock-token-' + Date.now();
      localStorage.setItem('token', mockToken);
      setUser(user);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded shadow">
        <h2 className="text-center text-3xl font-bold">Sign in</h2>
        
        {/* Quick Login Buttons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700">Quick Login (Testing)</h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin('super-admin')}
              className="p-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
            >
              Super Admin
            </button>
            <button
              onClick={() => handleQuickLogin('org-admin')}
              className="p-2 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
            >
              Org Admin
            </button>
            <button
              onClick={() => handleQuickLogin('hr-manager')}
              className="p-2 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
            >
              HR Manager
            </button>
            <button
              onClick={() => handleQuickLogin('dept-manager')}
              className="p-2 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
            >
              Dept Manager
            </button>
            <button
              onClick={() => handleQuickLogin('supervisor')}
              className="p-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
            >
              Supervisor
            </button>
            <button
              onClick={() => handleQuickLogin('employee')}
              className="p-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Employee
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
