import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Scan, Users, TrendingUp, Shield, Clock, BarChart3 } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-slate-900/30 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Scan className="h-8 w-8 text-emerald-400" />
              <span className="text-xl font-bold text-white font-mono">SmartAttend AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-slate-300 hover:text-white hover:bg-slate-800/50 backdrop-blur-sm font-mono"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button 
                className="bg-emerald-600/80 hover:bg-emerald-500 text-white backdrop-blur-sm border-emerald-500/30 font-mono"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-mono">
              Smart<span className="text-emerald-400">Attend</span> AI
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto font-mono">
              Revolutionary attendance tracking with AI-powered facial recognition and QR code scanning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-emerald-600/80 hover:bg-emerald-500 text-white backdrop-blur-sm border-emerald-500/30 font-mono text-lg px-8 py-4"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-600 text-slate-300 hover:bg-slate-800/50 backdrop-blur-sm font-mono text-lg px-8 py-4"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Scan className="h-10 w-10 text-emerald-400 mr-3" />
                <h3 className="text-xl font-semibold text-white font-mono">QR Code Scanning</h3>
              </div>
              <p className="text-slate-300 font-mono">Quick and efficient attendance marking with QR code technology</p>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Shield className="h-10 w-10 text-emerald-400 mr-3" />
                <h3 className="text-xl font-semibold text-white font-mono">Facial Recognition</h3>
              </div>
              <p className="text-slate-300 font-mono">Advanced AI-powered facial recognition for secure attendance</p>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-10 w-10 text-emerald-400 mr-3" />
                <h3 className="text-xl font-semibold text-white font-mono">Real-time Analytics</h3>
              </div>
              <p className="text-slate-300 font-mono">Comprehensive reports and insights for better decision making</p>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Users className="h-10 w-10 text-emerald-400 mr-3" />
                <h3 className="text-xl font-semibold text-white font-mono">Multi-Role Support</h3>
              </div>
              <p className="text-slate-300 font-mono">Separate dashboards for students and professors</p>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Clock className="h-10 w-10 text-emerald-400 mr-3" />
                <h3 className="text-xl font-semibold text-white font-mono">Real-time Tracking</h3>
              </div>
              <p className="text-slate-300 font-mono">Instant attendance updates and notifications</p>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-10 w-10 text-emerald-400 mr-3" />
                <h3 className="text-xl font-semibold text-white font-mono">Trend Analysis</h3>
              </div>
              <p className="text-slate-300 font-mono">Identify patterns and improve attendance rates</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-700/50 py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-slate-400 font-mono">&copy; 2024 SmartAttend AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;