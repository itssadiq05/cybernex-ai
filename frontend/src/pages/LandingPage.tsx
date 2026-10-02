import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroCanvas } from '../components/landing/HeroCanvas';
import { TechStrip } from '../components/landing/TechStrip';
import { CapabilitiesGrid } from '../components/landing/CapabilitiesGrid';
import { Button } from '../components/common/Button';
import { Shield, ArrowRight, Activity, Terminal } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white relative overflow-hidden">
      {/* Navigation Header */}
      <nav className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#CCFF00]/10 border border-[#CCFF00]/30 rounded-lg">
            <Shield className="w-5 h-5 text-[#CCFF00]" />
          </div>
          <span className="text-xl font-extrabold font-mono tracking-wider text-white">CYBERNEX <span className="text-[#CCFF00]">AI</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate('/login')}>
            Sign In
          </Button>
          <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />} onClick={() => navigate('/dashboard')}>
            Explore Platform
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <HeroCanvas />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/5 text-[#CCFF00] text-xs font-mono mb-8">
          <Activity className="w-3.5 h-3.5 animate-pulse" />
          <span>CYBER THREAT INTELLIGENCE PLATFORM v1.0</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-tight mb-6">
          Understand threats before they become <span className="text-gradient-lime">critical incidents</span>.
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          Turn complex security log telemetry into actionable intelligence using unsupervised anomaly detection, supervised threat classification, and SHAP feature explainability.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto relative z-20">
          <Button size="lg" className="w-full sm:w-auto" icon={<ArrowRight className="w-5 h-5" />} onClick={() => navigate('/dashboard')}>
            Launch Command Center
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto" icon={<Terminal className="w-5 h-5" />} onClick={() => navigate('/log-analyzer')}>
            Analyze Sample Logs
          </Button>
        </div>
      </section>

      {/* Tech Strip & Features */}
      <TechStrip />
      <CapabilitiesGrid />

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#0B0B0D] py-8 text-center text-xs font-mono text-gray-500">
        <p>© 2026 CYBERNEX AI — Defensive Security Analytics Platform. Built for B.Tech Data Science / AI-ML Project.</p>
      </footer>
    </div>
  );
};
