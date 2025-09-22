import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Scan, Users, TrendingUp, Shield, Clock, BarChart3 } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Scan className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-800 font-mono">SmartAttend AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                className="text-slate-600 hover:text-slate-800 hover:bg-slate-100/50 backdrop-blur-sm font-mono"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button 
                className="bg-blue-600/90 hover:bg-blue-700 text-white backdrop-blur-sm border-blue-500/30 font-mono"
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
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 font-mono">
              Smart<span className="text-blue-600">Attend</span> AI
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto font-mono">
              Revolutionary attendance tracking with AI-powered facial recognition and QR code scanning
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600/90 hover:bg-blue-700 text-white backdrop-blur-sm border-blue-500/30 font-mono text-lg px-8 py-4"
                onClick={() => navigate("/signup")}
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-slate-300 text-slate-700 hover:bg-slate-100/50 backdrop-blur-sm font-mono text-lg px-8 py-4"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 p-6 hover:bg-white/80 transition-all duration-300 shadow-lg">
              <div className="flex items-center mb-4">
                <Scan className="h-10 w-10 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-slate-800 font-mono">QR Code Scanning</h3>
              </div>
              <p className="text-slate-600 font-mono">Quick and efficient attendance marking with QR code technology</p>
              <Button 
                variant="link" 
                className="text-blue-600 hover:text-blue-700 p-0 mt-2 font-mono"
                onClick={() => navigate("/qr-scanner")}
              >
                Try QR Scanner →
              </Button>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 p-6 hover:bg-white/80 transition-all duration-300 shadow-lg">
              <div className="flex items-center mb-4">
                <Shield className="h-10 w-10 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-slate-800 font-mono">Facial Recognition</h3>
              </div>
              <p className="text-slate-600 font-mono">Advanced AI-powered facial recognition for secure attendance</p>
              <Button 
                variant="link" 
                className="text-blue-600 hover:text-blue-700 p-0 mt-2 font-mono"
                onClick={() => navigate("/facial-recognition")}
              >
                Try Face Scanner →
              </Button>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 p-6 hover:bg-white/80 transition-all duration-300 shadow-lg">
              <div className="flex items-center mb-4">
                <BarChart3 className="h-10 w-10 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-slate-800 font-mono">Real-time Analytics</h3>
              </div>
              <p className="text-slate-600 font-mono">Comprehensive reports and insights for better decision making</p>
              <Button 
                variant="link" 
                className="text-blue-600 hover:text-blue-700 p-0 mt-2 font-mono"
                onClick={() => navigate("/professor-dashboard")}
              >
                View Dashboard →
              </Button>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 p-6 hover:bg-white/80 transition-all duration-300 shadow-lg">
              <div className="flex items-center mb-4">
                <Users className="h-10 w-10 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-slate-800 font-mono">Multi-Role Support</h3>
              </div>
              <p className="text-slate-600 font-mono">Separate dashboards for students and professors</p>
              <Button 
                variant="link" 
                className="text-blue-600 hover:text-blue-700 p-0 mt-2 font-mono"
                onClick={() => navigate("/student-portal")}
              >
                Student Portal →
              </Button>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 p-6 hover:bg-white/80 transition-all duration-300 shadow-lg">
              <div className="flex items-center mb-4">
                <Clock className="h-10 w-10 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-slate-800 font-mono">Real-time Tracking</h3>
              </div>
              <p className="text-slate-600 font-mono">Instant attendance updates and notifications</p>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 p-6 hover:bg-white/80 transition-all duration-300 shadow-lg">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-10 w-10 text-blue-600 mr-3" />
                <h3 className="text-xl font-semibold text-slate-800 font-mono">Trend Analysis</h3>
              </div>
              <p className="text-slate-600 font-mono">Identify patterns and improve attendance rates</p>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200/50 py-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center">
          <p className="text-slate-500 font-mono">&copy; 2024 SmartAttend AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;