import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Terminal,
  LockKeyhole,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { AuthContext } from '../context/AuthContext';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('Login must be used within AuthProvider');
  }

  const { loginDemo, isLoading } = auth;

  const handleDemoLogin = () => {
    loginDemo();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-[#CCFF00]/5 blur-[120px] rounded-full -top-40 -left-40" />
      <div className="absolute w-[500px] h-[500px] bg-[#00F0FF]/5 blur-[120px] rounded-full -bottom-40 -right-40" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-5">
            <div className="p-3 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/30">
              <Shield className="w-7 h-7 text-[#CCFF00]" />
            </div>

            <span className="text-2xl font-extrabold font-mono tracking-wider">
              CYBERNEX <span className="text-[#CCFF00]">AI</span>
            </span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight">
            Security Command Access
          </h1>

          <p className="text-sm text-gray-400 mt-3">
            Authenticate to access the CyberNex AI security operations platform.
          </p>
        </div>

        <div className="bg-[#0B0B0D] border border-white/10 rounded-2xl p-7 shadow-2xl">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/10">
            <div className="p-2 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/20">
              <LockKeyhole className="w-5 h-5 text-[#00F0FF]" />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Analyst Authentication
              </p>
              <p className="text-xs text-gray-500 font-mono">
                SECURE SESSION INITIALIZATION
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
                Analyst Identity
              </label>

              <div className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-sm text-gray-300 font-mono">
                analyst@cybernex.ai
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
                Access Token
              </label>

              <div className="w-full px-4 py-3 rounded-lg bg-black/50 border border-white/10 text-sm text-gray-500 font-mono">
                ••••••••••••••••
              </div>
            </div>

            <Button
              size="lg"
              variant="primary"
              className="w-full mt-3"
              icon={<ArrowRight className="w-5 h-5" />}
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Initializing Session...' : 'Enter Command Center'}
            </Button>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 font-mono">
              <Terminal className="w-3.5 h-3.5 text-[#CCFF00]" />
              DEMO SECURITY ANALYST SESSION
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="block mx-auto mt-6 text-xs text-gray-500 hover:text-[#CCFF00] transition-colors"
        >
          ← Back to CyberNex AI
        </button>
      </div>
    </div>
  );
};

export default Login;